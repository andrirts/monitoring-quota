import { Module } from '@nestjs/common';
import { MsisdnModule } from '../msisdn/msisdn.module';
import { NotificationService } from './notification.service';

@Module({
    imports: [MsisdnModule],
    providers: [NotificationService],
    exports: [NotificationService],
})
export class NotificationModule { }
