import { Controller, Get, Query } from '@nestjs/common';
import { ActivityLogService } from './activity-log.service';

@Controller('activity-logs')
export class ActivityLogController {
    constructor(private readonly activityLogService: ActivityLogService) { }

    /**
     * GET /activity-logs?page=1&limit=24&startDate=2026-03-13&endDate=2026-03-14
     * Default limit 24 = data per jam selama 1 hari
     * Filter opsional: startDate & endDate berdasarkan waktu pencatatan (recordedAt)
     */
    @Get()
    async findAll(
        @Query('page') page: string = '1',
        @Query('limit') limit: string = '24',
        @Query('startDate') startDate?: string,
        @Query('endDate') endDate?: string,
    ) {
        return this.activityLogService.findAll(
            Number(page),
            Number(limit),
            startDate,
            endDate,
        );
    }
}
