import { Module } from '@nestjs/common';
import { MsisdnController } from './msisdn.controller';
import { MsisdnService } from './msisdn.service';

@Module({
    controllers: [MsisdnController],
    providers: [MsisdnService],
    exports: [MsisdnService],
})
export class MsisdnModule { }
