import { Injectable, Logger } from '@nestjs/common';
import * as dayjs from 'dayjs';
import * as puppeteer from 'puppeteer';

export interface ScrapeResult {
  url: string;
  data: Record<string, string>;
  kuotaNasional: number;
  errorMessage?: string;
}

@Injectable()
export class PuppeteerService {
  private readonly logger = new Logger(PuppeteerService.name);
  private readonly CONCURRENCY = 10;
  private readonly MAX_RETRIES = 3;

  private parseQuotaValue(value: string): number {
    if (!value) return 0;
    const match = value.trim().match(/([\d.]+)\s*(GB|MB|KB)?/i);
    if (!match) return 0;

    const num = parseFloat(match[1]);
    const unit = (match[2] || 'MB').toUpperCase();

    switch (unit) {
      case 'GB':
        return num * 1024;
      default:
        return num;
    }
  }

  private async scrapeUrl(
    browser: puppeteer.Browser,
    url: string,
    retryCount = 0,
  ): Promise<ScrapeResult> {
    let page: puppeteer.Page | null = null;

    try {
      page = await browser.newPage();

      await page.setUserAgent(
        'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36',
      );
      await page.goto(url, {
        waitUntil: 'domcontentloaded',
        timeout: 30000,
      });

      await page.waitForSelector('.other-title', { timeout: 15000 });

      const data = await page.evaluate(() => {
        const titles = document.querySelectorAll(
          '.other-title',
        ) as NodeListOf<HTMLElement>;
        const values = document.querySelectorAll(
          '.other-value',
        ) as NodeListOf<HTMLElement>;
        const result: Record<string, string> = {};
        titles.forEach((el, i) => {
          result[el.innerText.trim()] = values[i]?.innerText.trim();
        });
        return result;
      });

      const kuotaNasional = this.parseQuotaValue(data['Kuota Nasional'] || '0');
      this.logger.log(`✅ ${url} → ${kuotaNasional} MB`);

      return { url, data, kuotaNasional };
    } catch (err) {
      let isRateLimit = false;
      if (err.name === 'TimeoutError' && page) {
        try {
          const bodyText = await page.evaluate(() =>
            document.body.innerText.substring(0, 200),
          );
          if (bodyText.toLowerCase().includes('rate limit')) {
            isRateLimit = true;
          }
          this.logger.error(
            `Timeout on ${url}. Page content started with: ${bodyText.replace(/\n/g, ' ')}`,
          );
        } catch (_) { }
      }

      if (retryCount < this.MAX_RETRIES) {
        this.logger.warn(`⚠️ Retry ${retryCount + 1}/${this.MAX_RETRIES} for ${url}${isRateLimit ? ' (Rate Limit Active)' : ''}`);
        if (page) await page.close().catch(() => { });
        page = null;
        await new Promise((r) => setTimeout(r, isRateLimit ? 30000 : 1000));
        return this.scrapeUrl(browser, url, retryCount + 1);
      }
      this.logger.error(
        `❌ ${url} (after ${this.MAX_RETRIES} retries): ${err.message}`,
      );
      return { url, data: {}, kuotaNasional: 0, errorMessage: err.message };
    } finally {
      try {
        if (page) await page.close();
      } catch (_) { }
    }
  }

  async getQuota(urls: string[]): Promise<ScrapeResult[]> {
    if (urls.length === 0) {
      this.logger.warn('No URLs to scrape');
      return [];
    }

    let browser: puppeteer.Browser | null = null;

    try {
      this.logger.log(
        `${dayjs().format('YYYY-MM-DD HH:mm:ss')} Starting scrape: ${urls.length} URLs, ${this.CONCURRENCY} parallel pages...`,
      );

      browser = await puppeteer.launch({
        headless: true,
        args: [
          '--no-sandbox',
          '--disable-setuid-sandbox',
          '--disable-dev-shm-usage',
          '--disable-gpu',
        ],
      });

      const results: ScrapeResult[] = new Array(urls.length);
      let completedCount = 0;

      const queue = urls.map((url, index) => ({ url, index }));
      const workers: Promise<void>[] = [];

      for (let w = 0; w < this.CONCURRENCY; w++) {
        workers.push(
          (async () => {
            while (queue.length > 0) {
              const item = queue.shift();
              if (!item) break;

              // Mode Cepat: Hajar terus secepat mungkin sampai kena Rate Limit
              await new Promise((r) => setTimeout(r, 200 + Math.random() * 600));

              const result = await this.scrapeUrl(browser!, item.url);
              results[item.index] = result;
              completedCount++;

              if (completedCount % 25 === 0) {
                this.logger.log(
                  `Progress: ${completedCount}/${urls.length} (${Math.round((completedCount / urls.length) * 100)}%)`,
                );
              }
            }
          })(),
        );
      }

      await Promise.all(workers);

      const successCount = results.filter(
        (r) => Object.keys(r.data).length > 0,
      ).length;
      const failCount = results.filter(
        (r) => Object.keys(r.data).length === 0,
      ).length;

      this.logger.log(
        `${dayjs().format('YYYY-MM-DD HH:mm:ss')} Finished: ${successCount} success, ${failCount} failed, ${results.length} total.`,
      );

      return results;
    } catch (err) {
      this.logger.error('Error in getQuota:', err);
      throw err;
    } finally {
      if (browser) {
        try {
          await browser.close();
        } catch (err) {
          this.logger.warn('Browser close error (ignored):', err.message);
          try {
            browser.process()?.kill('SIGKILL');
          } catch (_) { }
        }
      }
    }
  }
}
