import { Controller, Get, Query, Param, Res, NotFoundException } from '@nestjs/common';
import { Response } from 'express';
import { ActivityLogService } from './activity-log.service';
import * as dayjs from 'dayjs';

@Controller('activity-logs')
export class ActivityLogController {
    constructor(private readonly activityLogService: ActivityLogService) { }

    @Get('chart')
    async getChartData(
        @Query('groupBy') groupBy?: 'hour' | 'day',
        @Query('startDate') startDate?: string,
        @Query('endDate') endDate?: string,
        @Query('city') city?: string,
    ) {
        return this.activityLogService.getChartData(groupBy || 'hour', startDate, endDate, city);
    }

    @Get('summary')
    async getSummary(
        @Query('startDate') startDate?: string,
        @Query('endDate') endDate?: string,
    ) {
        return this.activityLogService.getSummaryByDate(startDate, endDate);
    }

    @Get('cities')
    async getCities() {
        return this.activityLogService.getCities();
    }

    @Get(':id/failures')
    async getFailures(@Param('id') id: string) {
        const failures = await this.activityLogService.getFailuresByLogId(Number(id));
        return failures;
    }

    @Get(':id/failures/export')
    async exportFailures(
        @Param('id') id: string,
        @Res() res: Response,
    ) {
        const buffer = await this.activityLogService.exportFailuresExcel(Number(id));
        const filename = `scrape-failures-log-${id}-${dayjs().format('YYYY-MM-DD')}.xlsx`;

        res.setHeader('Content-Type', 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet');
        res.setHeader('Content-Disposition', `attachment; filename="${filename}"`);
        res.send(buffer);
    }

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
