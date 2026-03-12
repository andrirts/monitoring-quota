import { Module } from '@nestjs/common';
import { PuppeteerModule } from '../puppeteer/puppeteer.module';
import { MsisdnModule } from '../msisdn/msisdn.module';
import { NotificationModule } from '../notification/notification.module';
import { ActivityLogModule } from '../activity-log/activity-log.module';
import { SchedulerService } from './scheduler.service';

@Module({
  imports: [PuppeteerModule, MsisdnModule, NotificationModule, ActivityLogModule],
  providers: [SchedulerService],
})
export class SchedulerModule { }
