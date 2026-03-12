import { Module } from '@nestjs/common';
import { ActivityLogService } from './activity-log.service';
import { ActivityLogController } from './activity-log.controller';
import { PrismaModule } from '../prisma/prisma.module';
import { MsisdnModule } from '../msisdn/msisdn.module';

@Module({
    imports: [PrismaModule, MsisdnModule],
    providers: [ActivityLogService],
    controllers: [ActivityLogController],
    exports: [ActivityLogService],
})
export class ActivityLogModule { }
