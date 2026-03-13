import { Injectable, Logger } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { BulkUploadItemDto } from './dto/bulk-upload.dto';
import * as ExcelJS from 'exceljs';
import * as csvParser from 'csv-parser';
import { Readable } from 'stream';

@Injectable()
export class MsisdnService {
    private readonly logger = new Logger(MsisdnService.name);

    constructor(private readonly prisma: PrismaService) { }

    async parseFile(file: Express.Multer.File): Promise<BulkUploadItemDto[]> {
        const ext = file.originalname.split('.').pop()?.toLowerCase();

        if (ext === 'xlsx' || ext === 'xls') {
            return this.parseExcel(file.buffer);
        } else if (ext === 'csv') {
            return this.parseCsv(file.buffer);
        } else {
            throw new Error('Format file tidak didukung. Gunakan .xlsx, .xls, atau .csv');
        }
    }


    async parseExcelForRemove(file: Express.Multer.File): Promise<string[]> {
        const ext = file.originalname.split('.').pop()?.toLowerCase();
        if (ext !== 'xlsx' && ext !== 'xls') {
            throw new Error('Format file tidak didukung. Gunakan .xlsx atau .xls');
        }

        const workbook = new ExcelJS.Workbook();
        await workbook.xlsx.load(file.buffer as any);
        const worksheet = workbook.worksheets[0];

        if (!worksheet) throw new Error('Worksheet tidak ditemukan');

        const msisdnList: string[] = [];

        worksheet.eachRow((row, rowNumber) => {
            if (rowNumber === 1) return;
            const msisdn = this.getCellString(row.getCell(2));
            if (msisdn) msisdnList.push(msisdn);
        });

        return msisdnList;
    }


    private getCellNumber(cell: ExcelJS.Cell): number {
        const value = cell.value;
        if (value === null || value === undefined) return 0;

        if (typeof value === 'object' && 'result' in (value as any)) {
            return Number((value as any).result) || 0;
        }

        return Number(value) || 0;
    }


    private getCellString(cell: ExcelJS.Cell): string {
        const value = cell.value;
        if (value === null || value === undefined) return '';

        if (typeof value === 'object') {
            const obj = value as any;
            if (obj.hyperlink) return String(obj.hyperlink).trim();
            if (obj.text) return String(obj.text).trim();
            if (obj.result) return String(obj.result).trim();
        }

        return String(value).trim();
    }


    private async parseExcel(buffer: Buffer): Promise<BulkUploadItemDto[]> {
        const workbook = new ExcelJS.Workbook();
        await workbook.xlsx.load(buffer as any);
        const worksheet = workbook.worksheets[0];

        if (!worksheet) {
            throw new Error('Worksheet tidak ditemukan');
        }

        const results: BulkUploadItemDto[] = [];

        worksheet.eachRow((row, rowNumber) => {
            if (rowNumber === 1) return;

            const msisdn = this.getCellString(row.getCell(2));
            const sn = this.getCellString(row.getCell(3));
            const slotSimbank = this.getCellNumber(row.getCell(4));
            const linkCekKuota = this.getCellString(row.getCell(5));
            const noDus = this.getCellString(row.getCell(6));
            const kuota = this.getCellNumber(row.getCell(7));
            const usedQuota = this.getCellNumber(row.getCell(8));
            const remainingQuota = this.getCellNumber(row.getCell(9));

            if (!msisdn || !linkCekKuota) return;

            results.push({ msisdn, sn, slotSimbank, linkCekKuota, noDus, kuota, usedQuota, remainingQuota });
        });

        return results;
    }

    private async parseCsv(buffer: Buffer): Promise<BulkUploadItemDto[]> {
        return new Promise((resolve, reject) => {
            const results: BulkUploadItemDto[] = [];
            const stream = Readable.from(buffer.toString());

            stream
                .pipe(csvParser())
                .on('data', (row: Record<string, string>) => {
                    const msisdn = (row['MSISDN'] || row['msisdn'] || '').trim();
                    const sn = (row['SN'] || row['sn'] || '').trim();
                    const slotSimbank = Number(row['SLOT Simbank Baru'] || row['slotSimbank'] || row['slot_simbank']) || 0;
                    const linkCekKuota = (row['Link Cek Kuota'] || row['linkCekKuota'] || row['link_cek_kuota'] || '').trim();
                    const noDus = (row['No Dus'] || row['noDus'] || row['no_dus'] || '').trim();
                    const kuota = Number(row['Kuota'] || row['kuota']) || 0;
                    const usedQuota = Number(row['Used Quota'] || row['usedQuota'] || row['used_quota']) || 0;
                    const remainingQuota = Number(row['Remaining Quota'] || row['remainingQuota'] || row['remaining_quota']) || 0;

                    if (msisdn && linkCekKuota) {
                        results.push({ msisdn, sn, slotSimbank, linkCekKuota, noDus, kuota, usedQuota, remainingQuota });
                    }
                })
                .on('end', () => resolve(results))
                .on('error', (err) => reject(err));
        });
    }

    /**
     * Bulk insert data ke database.
     * Jika remainingQuota <= 0 saat upload, langsung set isExhausted = true
     */
    async bulkUpload(data: BulkUploadItemDto[]) {
        const result = await this.prisma.client.msisdn.createMany({
            data: data.map((item) => {
                return {
                    msisdn: item.msisdn,
                    sn: item.sn,
                    slotSimbank: item.slotSimbank,
                    linkCekKuota: item.linkCekKuota,
                    noDus: item.noDus,
                    kuota: item.kuota,
                    usedQuota: 0,
                    remainingQuota: 0,
                    isExhausted: item.kuota <= 0.2,
                };
            }),
            skipDuplicates: true,
        });

        this.logger.log(`Bulk uploaded ${result.count} records`);
        return { count: result.count, message: `${result.count} data berhasil diupload` };
    }


    async bulkRemoveByMsisdn(msisdnList: string[]) {
        const result = await this.prisma.client.msisdn.deleteMany({
            where: { msisdn: { in: msisdnList } },
        });

        this.logger.log(`Bulk removed ${result.count} records by MSISDN`);
        return { count: result.count, message: `${result.count} data berhasil dihapus` };
    }


    async findAll(page: number = 1, limit: number = 10, status?: string, search?: string, sort?: string) {
        const safePage = Math.max(1, page);
        const safeLimit = Math.min(Math.max(1, limit), 1000);
        const skip = (safePage - 1) * safeLimit;

        const where: any = {};

        if (status === 'aktif') {
            where.isExhausted = false;
        } else if (status === 'habis') {
            where.isExhausted = true;
        }

        if (search) {
            where.OR = [
                { msisdn: { contains: search } },
                { sn: { contains: search } },
            ];
        }

        const orderBy = sort === 'desc'
            ? { lastScrapedAt: 'desc' as const }
            : { id: 'asc' as const };

        const [data, total] = await Promise.all([
            this.prisma.client.msisdn.findMany({
                where,
                orderBy,
                skip,
                take: safeLimit,
            }),
            this.prisma.client.msisdn.count({ where }),
        ]);

        return {
            data,
            meta: {
                total,
                page: safePage,
                limit: safeLimit,
                totalPages: Math.ceil(total / safeLimit),
            },
        };
    }

    /**
     * Summary realtime dari DB.
     * newlyExhausted = total SIM yang baru habis dalam 1 jam terakhir
     * (jumlah dari semua activity log snapshot dalam 60 menit terakhir)
     */
    async getSummary() {
        const data = await this.prisma.client.msisdn.findMany();
        const totalSimCards = data.length;

        let statusActive = 0;
        let statusHabis = 0;
        let lastScrapedAt: Date | null = null;

        for (const d of data) {
            if (d.isExhausted) {
                statusHabis++;
            } else {
                statusActive++;
            }
            if (d.lastScrapedAt) {
                if (!lastScrapedAt || d.lastScrapedAt > lastScrapedAt) {
                    lastScrapedAt = d.lastScrapedAt;
                }
            }
        }

        // Sum newlyExhausted dari semua log dalam 1 jam terakhir
        const oneHourAgo = new Date(Date.now() - 60 * 60 * 1000);
        const recentLogs = await this.prisma.client.activityLog.findMany({
            where: { recordedAt: { gte: oneHourAgo } },
            select: { newlyExhausted: true },
        });
        const newlyExhausted = recentLogs.reduce(
            (sum, log) => sum + log.newlyExhausted,
            0,
        );

        return {
            totalSimCards,
            statusActive,
            statusHabis,
            newlyExhausted,
            lastScrapedAt,
        };
    }


    async getAllLinks() {
        return this.prisma.client.msisdn.findMany({
            where: { isExhausted: false },
            select: { id: true, linkCekKuota: true, kuota: true },
        });
    }


    async updateQuotaById(id: number, kuotaTerbaru: number) {
        return this.prisma.client.msisdn.update({
            where: { id },
            data: {
                kuota: kuotaTerbaru,
                lastScrapedAt: new Date(),
            },
        });
    }


    async getLowQuotaData(thresholdGB: number) {
        return this.prisma.client.msisdn.findMany({
            where: { kuota: { lt: thresholdGB } },
            orderBy: { kuota: 'asc' },
        });
    }

    async exportToExcel(data?: any[]): Promise<Buffer> {
        const records = data || (await this.prisma.client.msisdn.findMany({ orderBy: { id: 'asc' } }));


        const workbook = new ExcelJS.Workbook();
        const sheet = workbook.addWorksheet('MSISDN Data');

        sheet.columns = [
            { header: 'No', key: 'no', width: 6 },
            { header: 'MSISDN', key: 'msisdn', width: 15 },
            { header: 'SN', key: 'sn', width: 20 },
            { header: 'SLOT Simbank Baru', key: 'slotSimbank', width: 18 },
            { header: 'Link Cek Kuota', key: 'linkCekKuota', width: 50 },
            { header: 'No Dus', key: 'noDus', width: 10 },
            { header: 'Kuota', key: 'kuota', width: 10 },
            { header: 'Used Quota', key: 'usedQuota', width: 12 },
            { header: 'Remaining Quota', key: 'remainingQuota', width: 16 },
        ];

        sheet.getRow(1).font = { bold: true, color: { argb: 'FFFFFFFF' } };
        sheet.getRow(1).fill = {
            type: 'pattern',
            pattern: 'solid',
            fgColor: { argb: 'FF4472C4' },
        };

        records.forEach((record, index) => {
            sheet.addRow({
                no: index + 1,
                msisdn: record.msisdn,
                sn: record.sn,
                slotSimbank: record.slotSimbank,
                linkCekKuota: record.linkCekKuota,
                noDus: record.noDus,
                kuota: record.kuota,
                usedQuota: record.usedQuota,
                remainingQuota: record.remainingQuota,
            });
        });

        const buffer = await workbook.xlsx.writeBuffer();
        return Buffer.from(buffer);
    }
}
