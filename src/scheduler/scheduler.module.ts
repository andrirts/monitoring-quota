import { Module } from '@nestjs/common';
import { PuppeteerModule } from 'src/puppeteer/puppeteer.module';
import { SchedulerService } from './scheduler.service';

@Module({
  imports: [PuppeteerModule],
  providers: [SchedulerService],
})
export class SchedulerModule {}
