import { Injectable } from '@nestjs/common';
import { Cron } from '@nestjs/schedule';
import { PuppeteerService } from 'src/puppeteer/puppeteer.service';

@Injectable()
export class SchedulerService {
  private isRunning = false;

  constructor(private readonly puppeteerService: PuppeteerService) {}

  @Cron('* * * * * *')
  async handleCron() {
    if (this.isRunning) {
      //   console.log('Previous task is still running. Skipping this execution.');
      return;
    }
    this.isRunning = true;
    console.log('Called when the current second is 0');
    await this.puppeteerService.getQuota([
      'https://digipos.telkomsel.com/simcardchecking/S157X01500000534775130000108127010721',
      'https://digipos.telkomsel.com/simcardchecking/S157X0150000053477514000010812701073',
      'https://digipos.telkomsel.com/simcardchecking/S157X0150000053477515000010812701074',
      'https://digipos.telkomsel.com/simcardchecking/S157X0150000053477516000010812701075',
      'https://digipos.telkomsel.com/simcardchecking/S157X0150000053477522000010812701081',
      'https://digipos.telkomsel.com/simcardchecking/S157X0150000053477530000010812701089',
      'https://digipos.telkomsel.com/simcardchecking/S157X0150000053477532000010812701091',
      'https://digipos.telkomsel.com/simcardchecking/S157X0150000053477534000010812701093',
      'https://digipos.telkomsel.com/simcardchecking/S157X0150000053477536000010812701095',
      'https://digipos.telkomsel.com/simcardchecking/S157X0150000053477542000010812701102',
      'https://digipos.telkomsel.com/simcardchecking/S157X0150000053477545000010812701105',
      'https://digipos.telkomsel.com/simcardchecking/S157X0150000053477548000010812701108',
      'https://digipos.telkomsel.com/simcardchecking/S157X0150000052945204000010812301169',
      'https://digipos.telkomsel.com/simcardchecking/S157X0150000052945208000010812301173',
    ]);
    this.isRunning = false;
  }
}
