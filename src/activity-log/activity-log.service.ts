import { Injectable, Logger } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import * as ExcelJS from 'exceljs';

export interface ScrapeFailureInput {
    msisdn: string;
    url: string;
    errorMessage: string;
}

export interface ScrapeStatsInput {
    scrapeTotal: number;
    scrapeSuccess: number;
    scrapeFailed: number;
}

@Injectable()
export class ActivityLogService {
    private readonly logger = new Logger(ActivityLogService.name);

    private readonly EXHAUSTED_THRESHOLD = 400;

    constructor(private readonly prisma: PrismaService) { }

    /**
     * Dijalankan setiap 15 menit setelah scrape selesai.
     * - Update isExhausted untuk yang kuota < 400 MB
     * - Hitung newlyExhausted
     * - Buat activity log snapshot 
     */
    async flagAndSnapshot(
        failures: ScrapeFailureInput[] = [],
        scrapeStats?: ScrapeStatsInput,
    ): Promise<void> {
        const recoveredResult = await this.prisma.client.msisdn.updateMany({
            where: {
                kuota: { gte: this.EXHAUSTED_THRESHOLD },
                isExhausted: true,
            },
            data: { isExhausted: false },
        });
        if (recoveredResult.count > 0) {
            this.logger.log(
                `Recovered ${recoveredResult.count} SIMs (kuota kembali >= ${this.EXHAUSTED_THRESHOLD} MB)`,
            );
        }

        const aboutToExhaust = await this.prisma.client.msisdn.findMany({
            where: {
                kuota: { lt: this.EXHAUSTED_THRESHOLD },
                isExhausted: false,
            },
            select: { city: true },
        });

        const cityMap = new Map<string, number>();
        for (const card of aboutToExhaust) {
            const city = card.city || 'All Location';
            cityMap.set(city, (cityMap.get(city) || 0) + 1);
        }

        const updateResult = await this.prisma.client.msisdn.updateMany({
            where: {
                kuota: { lt: this.EXHAUSTED_THRESHOLD },
                isExhausted: false,
            },
            data: {
                isExhausted: true,
            },
        });

        const newlyExhausted = updateResult.count;

        const allData = await this.prisma.client.msisdn.findMany({
            select: { kuota: true },
        });

        const totalSimCards = allData.length;
        const statusHabis = allData.filter((d) => d.kuota < this.EXHAUSTED_THRESHOLD).length;
        const statusActive = totalSimCards - statusHabis;

        const activityLog = await this.prisma.client.activityLog.create({
            data: {
                totalSimCards,
                statusActive,
                statusHabis,
                newlyExhausted,
                scrapeTotal: scrapeStats?.scrapeTotal || 0,
                scrapeSuccess: scrapeStats?.scrapeSuccess || 0,
                scrapeFailed: scrapeStats?.scrapeFailed || 0,
                cityBreakdown: {
                    create: Array.from(cityMap.entries()).map(([city, count]) => ({
                        city,
                        newlyExhausted: count,
                    })),
                },
                scrapeFailures: failures.length > 0 ? {
                    create: failures.map((f) => ({
                        msisdn: f.msisdn,
                        url: f.url,
                        errorMessage: f.errorMessage,
                    })),
                } : undefined,
            },
        });

        this.logger.log(
            `[15min] Flag & snapshot — Total: ${totalSimCards} | Aktif: ${statusActive} | Habis: ${statusHabis} | Newly Exhausted: ${newlyExhausted} | Cities: ${cityMap.size} | Scrape: ${scrapeStats?.scrapeSuccess || 0}/${scrapeStats?.scrapeTotal || 0} success, ${failures.length} failures saved`,
        );
    }

    /**
     * Dijalankan setiap 1 jam (offset 5 menit).
     * Hanya cek msisdn yang statusnya sudah habis (isExhausted = true)
     * dan buat activity log snapshot.
     */
    async createSnapshot(): Promise<void> {
        const allData = await this.prisma.client.msisdn.findMany({
            select: { kuota: true, isExhausted: true },
        });

        const totalSimCards = allData.length;
        const statusHabis = allData.filter((d) => d.isExhausted).length;
        const statusActive = totalSimCards - statusHabis;

        await this.prisma.client.activityLog.create({
            data: {
                totalSimCards,
                statusActive,
                statusHabis,
                newlyExhausted: 0,
            },
        });

        this.logger.log(
            `[1hour] Snapshot — Total: ${totalSimCards} | Aktif: ${statusActive} | Habis: ${statusHabis}`,
        );
    }

    /**
     * GET /activity-logs
     */
    async findAll(
        page: number = 1,
        limit: number = 24,
        startDate?: string,
        endDate?: string,
    ) {
        const safePage = Math.max(1, page);
        const safeLimit = Math.min(Math.max(1, limit), 500);
        const skip = (safePage - 1) * safeLimit;

        const where: any = {};

        if (startDate || endDate) {
            where.recordedAt = {};
            if (startDate) {
                where.recordedAt.gte = new Date(startDate + 'T00:00:00');
            }
            if (endDate) {
                where.recordedAt.lte = new Date(endDate + 'T23:59:59.999');
            }
        }

        const [data, total] = await Promise.all([
            this.prisma.client.activityLog.findMany({
                where,
                orderBy: { recordedAt: 'desc' },
                skip,
                take: safeLimit,
            }),
            this.prisma.client.activityLog.count({ where }),
        ]);

        return {
            data,
            meta: {
                total,
                page: safePage,
                limit: safeLimit,
                totalPages: Math.ceil(total / safeLimit),
            },
        };
    }

    /**
     * GET /activity-logs/chart
     */
    async getChartData(groupBy: 'hour' | 'day', startDate?: string, endDate?: string, city?: string) {
        const where: any = {};
        if (startDate || endDate) {
            where.recordedAt = {};
            if (startDate) {
                where.recordedAt.gte = new Date(startDate + 'T00:00:00');
            }
            if (endDate) {
                where.recordedAt.lte = new Date(endDate + 'T23:59:59.999');
            }
        }

        const cityBreakdownSelect: any = {
            select: { city: true, newlyExhausted: true },
        };
        if (city) {
            cityBreakdownSelect.where = { city };
        }

        const logs = await this.prisma.client.activityLog.findMany({
            where,
            orderBy: { recordedAt: 'asc' },
            select: {
                recordedAt: true,
                newlyExhausted: true,
                cityBreakdown: cityBreakdownSelect,
            },
        });

        const allCities = new Set<string>();
        for (const log of logs) {
            for (const cb of log.cityBreakdown) {
                allCities.add(cb.city);
            }
        }

        const groupedData = new Map<string, Record<string, number>>();

        let rangeStart: Date | null = null;
        let rangeEnd: Date | null = null;

        if (startDate) {
            rangeStart = new Date(startDate + 'T00:00:00');
        }
        if (endDate) {
            rangeEnd = new Date(endDate + 'T23:59:59.999');
        }

        if (!rangeStart && logs.length > 0) {
            rangeStart = new Date(logs[0].recordedAt);
        }
        if (!rangeEnd && logs.length > 0) {
            rangeEnd = new Date(logs[logs.length - 1].recordedAt);
        }

        const getDateStr = (d: Date) =>
            groupBy === 'hour'
                ? `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}-${String(d.getDate()).padStart(2, '0')} ${String(d.getHours()).padStart(2, '0')}:00`
                : `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}-${String(d.getDate()).padStart(2, '0')}`;

        if (rangeStart && rangeEnd) {
            let currentPointer = new Date(rangeStart);
            if (groupBy === 'hour') {
                currentPointer.setMinutes(0, 0, 0);
            } else {
                currentPointer.setHours(0, 0, 0, 0);
            }

            while (currentPointer <= rangeEnd) {
                groupedData.set(getDateStr(currentPointer), {});
                if (groupBy === 'hour') {
                    currentPointer.setHours(currentPointer.getHours() + 1);
                } else {
                    currentPointer.setDate(currentPointer.getDate() + 1);
                }
            }
        }

        for (const log of logs) {
            const dateStr = getDateStr(new Date(log.recordedAt));
            const slot = groupedData.get(dateStr) || {};

            if (log.cityBreakdown.length > 0) {
                for (const cb of log.cityBreakdown) {
                    slot[cb.city] = (slot[cb.city] || 0) + cb.newlyExhausted;
                }
            } else if (!city && log.newlyExhausted > 0) {
                slot['All Location'] = (slot['All Location'] || 0) + log.newlyExhausted;
                allCities.add('All Location');
            }

            groupedData.set(dateStr, slot);
        }

        const cities = city
            ? [city]
            : Array.from(allCities).sort();

        const chartData = Array.from(groupedData.entries()).map(([time, cityData]) => {
            const row: Record<string, any> = { time };
            for (const c of cities) {
                row[c] = cityData[c] || 0;
            }
            return row;
        });

        return { cities, chartData };
    }


    /**
     * GET /activity-logs/summary
     */
    async getSummaryByDate(startDate?: string, endDate?: string) {
        const where: any = {};
        if (startDate || endDate) {
            where.recordedAt = {};
            if (startDate) {
                where.recordedAt.gte = new Date(startDate + 'T00:00:00');
            }
            if (endDate) {
                where.recordedAt.lte = new Date(endDate + 'T23:59:59.999');
            }
        }

        const logs = await this.prisma.client.activityLog.findMany({
            where,
            select: {
                newlyExhausted: true,
                cityBreakdown: {
                    select: { city: true, newlyExhausted: true },
                },
            },
        });

        let totalExhausted = 0;
        const cityTotals = new Map<string, number>();

        for (const log of logs) {
            if (log.cityBreakdown.length > 0) {
                for (const cb of log.cityBreakdown) {
                    totalExhausted += cb.newlyExhausted;
                    cityTotals.set(cb.city, (cityTotals.get(cb.city) || 0) + cb.newlyExhausted);
                }
            } else if (log.newlyExhausted > 0) {
                totalExhausted += log.newlyExhausted;
                cityTotals.set('All Location', (cityTotals.get('All Location') || 0) + log.newlyExhausted);
            }
        }

        const cityBreakdown = Array.from(cityTotals.entries())
            .map(([city, count]) => ({ city, count }))
            .sort((a, b) => b.count - a.count);

        return { totalExhausted, cityBreakdown };
    }

    async getCities(): Promise<string[]> {
        const cities = await this.prisma.client.msisdn.findMany({
            select: { city: true },
            distinct: ['city'],
            orderBy: { city: 'asc' },
        });
        return cities.map((c) => c.city);
    }

    async getFailuresByLogId(activityLogId: number) {
        return this.prisma.client.scrapeFailure.findMany({
            where: { activityLogId },
            orderBy: { id: 'asc' },
        });
    }

    async exportFailuresExcel(activityLogId: number): Promise<Buffer> {
        const failures = await this.getFailuresByLogId(activityLogId);

        const log = await this.prisma.client.activityLog.findUnique({
            where: { id: activityLogId },
            select: { recordedAt: true },
        });

        const workbook = new ExcelJS.Workbook();
        const sheet = workbook.addWorksheet('Scrape Failures');

        sheet.columns = [
            { header: 'No', key: 'no', width: 6 },
            { header: 'MSISDN', key: 'msisdn', width: 18 },
            { header: 'URL', key: 'url', width: 70 },
            { header: 'Error Message', key: 'errorMessage', width: 50 },
            { header: 'Waktu Scrape', key: 'createdAt', width: 22 },
        ];

        sheet.getRow(1).font = { bold: true, color: { argb: 'FFFFFFFF' } };
        sheet.getRow(1).fill = {
            type: 'pattern',
            pattern: 'solid',
            fgColor: { argb: 'FFDC2626' },
        };

        failures.forEach((failure, index) => {
            sheet.addRow({
                no: index + 1,
                msisdn: failure.msisdn,
                url: failure.url,
                errorMessage: failure.errorMessage,
                createdAt: failure.createdAt,
            });
        });

        const buffer = await workbook.xlsx.writeBuffer();
        return Buffer.from(buffer);
    }
}
