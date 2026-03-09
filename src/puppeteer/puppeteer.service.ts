import { Injectable } from '@nestjs/common';
import * as puppeteer from 'puppeteer';

@Injectable()
export class PuppeteerService {
  async getQuota(urls: string[]): Promise<string> {
    try {
      console.log('Getting quota from URLs:', urls);

      const browser = await puppeteer.launch({
        headless: true,
        args: ['--no-sandbox', '--disable-setuid-sandbox'],
      });

      const page = await browser.newPage();

      const results = [];

      for (const url of urls) {
        console.log('Opening:', url);

        await page.goto(url, {
          waitUntil: 'networkidle2',
        });

        await page.waitForSelector('.other-title');

        const data = await page.evaluate(() => {
          const titles = document.querySelectorAll(
            '.other-title',
          ) as NodeListOf<HTMLElement>;

          const values = document.querySelectorAll(
            '.other-value',
          ) as NodeListOf<HTMLElement>;

          const result: Record<string, string> = {};

          titles.forEach((el, i) => {
            const key = el.innerText.trim();
            const value = values[i]?.innerText.trim();
            result[key] = value;
          });

          return result;
        });

        //   console.log('Result:', data);

        results.push({
          url,
          data,
        });
      }

      console.log('Results:', results);

      await browser.close();

      return JSON.stringify(results);
    } catch (err) {
      console.error('Error in getQuota:', err);
      throw err;
    }
  }
}
