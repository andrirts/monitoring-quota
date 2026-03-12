import { Injectable, Logger } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class ActivityLogService {
    private readonly logger = new Logger(ActivityLogService.name);

    private readonly EXHAUSTED_THRESHOLD = 0.2;

    constructor(private readonly prisma: PrismaService) { }

    /**
     * Buat snapshot activity log baru.
     * Dijalankan setiap jam (offset 5 menit)
     * - Kuota <= 0.2 jadi isExhausted = true
     */
    async createSnapshot(): Promise<void> {
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
            `Activity log created — Total: ${totalSimCards} | Active: ${statusActive} | Habis: ${statusHabis} | Newly Exhausted: ${newlyExhausted}`,
        );
    }


    async findAll(page: number = 1, limit: number = 24) {
        const safePage = Math.max(1, page);
        const safeLimit = Math.min(Math.max(1, limit), 200);
        const skip = (safePage - 1) * safeLimit;

        const [data, total] = await Promise.all([
            this.prisma.client.activityLog.findMany({
                orderBy: { recordedAt: 'desc' },
                skip,
                take: safeLimit,
            }),
            this.prisma.client.activityLog.count(),
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
