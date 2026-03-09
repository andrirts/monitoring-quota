import { Module } from '@nestjs/common';
import { ScheduleModule } from '@nestjs/schedule';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { SchedulerModule } from './scheduler/scheduler.module';
import { PuppeteerService } from './puppeteer/puppeteer.service';
import { PuppeteerModule } from './puppeteer/puppeteer.module';

@Module({
  imports: [ScheduleModule.forRoot(), SchedulerModule, PuppeteerModule],
  controllers: [AppController],
  providers: [AppService, PuppeteerService],
})
export class AppModule {}
