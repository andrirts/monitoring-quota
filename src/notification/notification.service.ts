import { Injectable, Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import * as nodemailer from 'nodemailer';
import * as dayjs from 'dayjs';
import { MsisdnService } from '../msisdn/msisdn.service';

@Injectable()
export class NotificationService {
    private readonly logger = new Logger(NotificationService.name);
    private transporter: nodemailer.Transporter;

    constructor(
        private readonly configService: ConfigService,
        private readonly msisdnService: MsisdnService,
    ) {
        this.transporter = nodemailer.createTransport({
            host: this.configService.get<string>('EMAIL_HOST', 'smtp.gmail.com'),
            port: this.configService.get<number>('EMAIL_PORT', 587),
            secure: false,
            auth: {
                user: this.configService.get<string>('EMAIL_USER'),
                pass: this.configService.get<string>('EMAIL_PASS'),
            },
        });
    }

    /**
     * Check apakah perlu kirim notifikasi setelah scraping
     * Logic: Jika jumlah kartu/SIM dengan kuota < 300MB jumlahnya >= 100,
     * maka akan dikirim email + Excel Notification
     */
    async checkAndNotify(): Promise<void> {
        try {
            const thresholdGB = 0.3;
            const minCount = 100;

            const lowQuotaData =
                await this.msisdnService.getLowQuotaData(thresholdGB);

            this.logger.log(
                `Low quota check: ${lowQuotaData.length} SIM cards below ${thresholdGB} GB (${thresholdGB * 1024} MB)`,
            );

            if (lowQuotaData.length < minCount) {
                this.logger.log(
                    `Count ${lowQuotaData.length} < ${minCount}. No notification needed.`,
                );
                return;
            }

            const excelBuffer =
                await this.msisdnService.exportToExcel(lowQuotaData);

            const emailTo = this.configService.get<string>('EMAIL_TO');
            if (!emailTo) {
                this.logger.warn('EMAIL_TO not configured. Skipping notification.');
                return;
            }

            const dateStr = dayjs().format('YYYY-MM-DD HH:mm');
            const filename = `low-quota-report-${dayjs().format('YYYY-MM-DD')}.xlsx`;

            await this.transporter.sendMail({
                from: `"Monitoring Quota System" <${this.configService.get<string>('EMAIL_USER')}>`,
                to: emailTo,
                subject: `[Alert] Quota Rendah - ${lowQuotaData.length} SIM Cards di bawah 300 MB`,
                html: `
          <div style="font-family: Arial, sans-serif; padding: 20px;">
            <h2 style="color: #e53e3e;">⚠️ Alert: Quota Rendah</h2>
            <p>Terdapat <strong>${lowQuotaData.length}</strong> SIM card dengan sisa kuota di bawah <strong>300 MB</strong>.</p>
            <table style="border-collapse: collapse; margin: 16px 0;">
              <tr>
                <td style="padding: 8px 16px; border: 1px solid #ddd; background: #f7f7f7;"><strong>Jumlah SIM Card</strong></td>
                <td style="padding: 8px 16px; border: 1px solid #ddd;">${lowQuotaData.length}</td>
              </tr>
              <tr>
                <td style="padding: 8px 16px; border: 1px solid #ddd; background: #f7f7f7;"><strong>Threshold</strong></td>
                <td style="padding: 8px 16px; border: 1px solid #ddd;">300 MB (0.3 GB)</td>
              </tr>
              <tr>
                <td style="padding: 8px 16px; border: 1px solid #ddd; background: #f7f7f7;"><strong>Waktu Pengecekan</strong></td>
                <td style="padding: 8px 16px; border: 1px solid #ddd;">${dateStr}</td>
              </tr>
            </table>
            <p>Detail terlampir dalam file Excel.</p>
            <hr style="margin: 20px 0; border: none; border-top: 1px solid #eee;" />
            <p style="color: #888; font-size: 12px;">Email ini dikirim otomatis oleh Monitoring Quota System.</p>
          </div>
        `,
                attachments: [
                    {
                        filename,
                        content: excelBuffer,
                        contentType:
                            'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
                    },
                ],
            });

            this.logger.log(
                `✅ Notification email sent to ${emailTo} with ${lowQuotaData.length} low-quota records.`,
            );
        } catch (err) {
            this.logger.error('Failed to send notification:', err.message);
        }
    }
}
