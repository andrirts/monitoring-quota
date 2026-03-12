import { Injectable, Logger } from '@nestjs/common';
import { Cron } from '@nestjs/schedule';
import { PuppeteerService } from '../puppeteer/puppeteer.service';
import { MsisdnService } from '../msisdn/msisdn.service';
import { NotificationService } from '../notification/notification.service';
import { ActivityLogService } from '../activity-log/activity-log.service';

@Injectable()
export class SchedulerService {
  private isRunning = false;
  private readonly logger = new Logger(SchedulerService.name);

  constructor(
    private readonly puppeteerService: PuppeteerService,
    private readonly msisdnService: MsisdnService,
    private readonly notificationService: NotificationService,
    private readonly activityLogService: ActivityLogService,
  ) { }

  /**
   * Scrape quota setiap 15 menit
   * Flow:
   * 1. Baca semua linkCekKuota dari DB (hanya yang isExhausted = false)
   * 2. Puppeteer scrape setiap link
   * 3. Update data kuota di DB
   */
  @Cron('0 */15 * * * *')
  async handleCron() {
    if (this.isRunning) {
      this.logger.warn('Previous scraping task is still running. Skipping.');
      return;
    }

    this.isRunning = true;

    try {
      const links = await this.msisdnService.getAllLinks();

      if (links.length === 0) {
        this.logger.log('No active MSISDN to scrape. Skipping.');
        return;
      }

      this.logger.log(`Starting scheduled scrape for ${links.length} URLs...`);

      const urls = links.map((l) => l.linkCekKuota);
      const results = await this.puppeteerService.getQuota(urls);

      let updatedCount = 0;
      for (const result of results) {
        const match = links.find((l) => l.linkCekKuota === result.url);
        if (!match) continue;

        await this.msisdnService.updateQuotaById(
          match.id,
          Math.round(result.kuotaNasional * 1000) / 1000,
        );
        updatedCount++;
      }

      this.logger.log(
        `Scheduled scrape complete. Updated ${updatedCount}/${links.length} records.`,
      );

      await this.notificationService.checkAndNotify();
    } catch (err) {
      this.logger.error('Error in scheduled scrape:', err);
    } finally {
      this.isRunning = false;
    }
  }

  /**
   * Buat snapshot activity log setiap 1 jam, di-offset 5 menit
   * (berjalan di menit 05 setiap jam, misal: 14:05, 15:05)
   */
  @Cron('0 5 * * * *')
  async handleActivityLog() {
    try {
      this.logger.log('Creating hourly activity log snapshot...');
      await this.activityLogService.createSnapshot();
    } catch (err) {
      this.logger.error('Error creating activity log:', err);
    }
  }
}


