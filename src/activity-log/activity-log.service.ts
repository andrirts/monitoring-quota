import { Injectable, Logger } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class ActivityLogService {
    private readonly logger = new Logger(ActivityLogService.name);

    private readonly EXHAUSTED_THRESHOLD = 0.2;

    constructor(private readonly prisma: PrismaService) { }

    /**
     * Dijalankan setiap 15 menit setelah scrape selesai.
     * - Update isExhausted untuk yang kuota <= 0.2
     * - Hitung newlyExhausted
     * - Buat activity log snapshot 
     */
    async flagAndSnapshot(): Promise<void> {
        const updateResult = await this.prisma.client.msisdn.updateMany({
            where: {
                kuota: { lte: this.EXHAUSTED_THRESHOLD },
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
        const statusHabis = allData.filter((d) => d.kuota <= this.EXHAUSTED_THRESHOLD).length;
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
        const safeLimit = Math.min(Math.max(1, limit), 200);
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
}
