import { Injectable, Logger } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class ActivityLogService {
    private readonly logger = new Logger(ActivityLogService.name);

    private readonly EXHAUSTED_THRESHOLD = 0.3;

    constructor(private readonly prisma: PrismaService) { }

    /**
     * Dijalankan setiap 15 menit setelah scrape selesai.
     * - Update isExhausted untuk yang kuota < 0.3
     * - Hitung newlyExhausted
     * - Buat activity log snapshot 
     */
    async flagAndSnapshot(): Promise<void> {
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

        await this.prisma.client.activityLog.create({
            data: {
                totalSimCards,
                statusActive,
                statusHabis,
                newlyExhausted,
            },
        });

        this.logger.log(
            `[15min] Flag & snapshot — Total: ${totalSimCards} | Aktif: ${statusActive} | Habis: ${statusHabis} | Newly Exhausted: ${newlyExhausted}`,
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
                where.recordedAt.gte = new Date(startDate);
            }
            if (endDate) {
                const end = new Date(endDate);
                end.setHours(23, 59, 59, 999);
                where.recordedAt.lte = end;
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
    async getChartData(groupBy: 'hour' | 'day', startDate?: string, endDate?: string) {
        const where: any = {};
        if (startDate || endDate) {
            where.recordedAt = {};
            if (startDate) {
                where.recordedAt.gte = new Date(startDate);
            }
            if (endDate) {
                const end = new Date(endDate);
                end.setHours(23, 59, 59, 999);
                where.recordedAt.lte = end;
            }
        }

        const logs = await this.prisma.client.activityLog.findMany({
            where,
            orderBy: { recordedAt: 'asc' },
            select: { recordedAt: true, newlyExhausted: true },
        });

        const groupedData = new Map<string, number>();

        if (logs.length > 0) {
            const minDate = new Date(logs[0].recordedAt);
            const maxDate = new Date(logs[logs.length - 1].recordedAt);

            let currentPointer = new Date(minDate);
            if (groupBy === 'hour') {
                currentPointer.setMinutes(0, 0, 0);
            } else {
                currentPointer.setHours(0, 0, 0, 0);
            }

            while (currentPointer <= maxDate) {
                const dateStr =
                    groupBy === 'hour'
                        ? `${currentPointer.getFullYear()}-${String(currentPointer.getMonth() + 1).padStart(2, '0')}-${String(currentPointer.getDate()).padStart(2, '0')} ${String(currentPointer.getHours()).padStart(2, '0')}:00`
                        : `${currentPointer.getFullYear()}-${String(currentPointer.getMonth() + 1).padStart(2, '0')}-${String(currentPointer.getDate()).padStart(2, '0')}`;

                groupedData.set(dateStr, 0);

                if (groupBy === 'hour') {
                    currentPointer.setHours(currentPointer.getHours() + 1);
                } else {
                    currentPointer.setDate(currentPointer.getDate() + 1);
                }
            }
        }

        for (const log of logs) {
            const date = new Date(log.recordedAt);
            const dateStr =
                groupBy === 'hour'
                    ? `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}-${String(date.getDate()).padStart(2, '0')} ${String(date.getHours()).padStart(2, '0')}:00`
                    : `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}-${String(date.getDate()).padStart(2, '0')}`;

            const current = groupedData.get(dateStr) || 0;
            groupedData.set(dateStr, current + log.newlyExhausted);
        }

        return Array.from(groupedData.entries()).map(([time, value]) => ({
            time,
            value,
        }));
    }
}
