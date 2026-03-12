import { Controller, Get, Query } from '@nestjs/common';
import { ActivityLogService } from './activity-log.service';

@Controller('activity-logs')
export class ActivityLogController {
    constructor(private readonly activityLogService: ActivityLogService) { }

    /**
     * GET /activity-logs?page=1&limit=24
     * Default limit 24 = data per jam selama 1 hari
     */
    @Get()
    async findAll(
        @Query('page') page: string = '1',
        @Query('limit') limit: string = '24',
    ) {
        return this.activityLogService.findAll(Number(page), Number(limit));
    }
}
