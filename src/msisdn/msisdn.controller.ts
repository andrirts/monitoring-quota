import {
    Controller,
    Get,
    Post,
    Delete,
    Res,
    Query,
    UseInterceptors,
    UploadedFile,
    BadRequestException,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { Response } from 'express';
import { MsisdnService } from './msisdn.service';
import * as dayjs from 'dayjs';

@Controller('msisdn')
export class MsisdnController {
    constructor(private readonly msisdnService: MsisdnService) { }

    /**
     * POST /msisdn/bulk-upload
     * Upload Excel (.xlsx) atau CSV (.csv) file
     */
    @Post('bulk-upload')
    @UseInterceptors(
        FileInterceptor('file', {
            limits: { fileSize: 15 * 1024 * 1024 }, // 15MB max
            fileFilter: (_req, file, cb) => {
                const allowedTypes = [
                    'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
                    'application/vnd.ms-excel',
                    'text/csv',
                    'application/csv',
                ];
                const ext = file.originalname.split('.').pop()?.toLowerCase();
                if (allowedTypes.includes(file.mimetype) || ['xlsx', 'xls', 'csv'].includes(ext)) {
                    cb(null, true);
                } else {
                    cb(new BadRequestException('Format file tidak didukung. Gunakan .xlsx atau .csv'), false);
                }
            },
        }),
    )
    async bulkUpload(@UploadedFile() file: Express.Multer.File) {
        if (!file) {
            throw new BadRequestException('File tidak ditemukan. Upload file Excel atau CSV.');
        }

        const parsedData = await this.msisdnService.parseFile(file);

        if (parsedData.length === 0) {
            throw new BadRequestException('File kosong atau format kolom tidak sesuai.');
        }

        return this.msisdnService.bulkUpload(parsedData);
    }

    /**
     * DELETE /msisdn/bulk-remove
     * Hapus data berdasarkan file Excel — kolom B (MSISDN) sebagai key
     */
    @Delete('bulk-remove')
    @UseInterceptors(
        FileInterceptor('file', {
            limits: { fileSize: 15 * 1024 * 1024 }, // 15MB max
            fileFilter: (_req, file, cb) => {
                const ext = file.originalname.split('.').pop()?.toLowerCase();
                const allowedTypes = [
                    'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
                    'application/vnd.ms-excel',
                ];
                if (allowedTypes.includes(file.mimetype) || ['xlsx', 'xls'].includes(ext)) {
                    cb(null, true);
                } else {
                    cb(new BadRequestException('Format file tidak didukung. Gunakan .xlsx atau .xls'), false);
                }
            },
        }),
    )
    async bulkRemove(@UploadedFile() file: Express.Multer.File) {
        if (!file) {
            throw new BadRequestException('File tidak ditemukan. Upload file Excel (.xlsx).');
        }

        const msisdnList = await this.msisdnService.parseExcelForRemove(file);

        if (msisdnList.length === 0) {
            throw new BadRequestException('File kosong atau tidak ada MSISDN yang ditemukan di kolom B.');
        }

        return this.msisdnService.bulkRemoveByMsisdn(msisdnList);
    }

    /**
     * GET /msisdn?page=1&limit=10
     */
    @Get()
    async findAll(
        @Query('page') page: string = '1',
        @Query('limit') limit: string = '10',
        @Query('status') status?: string,
        @Query('search') search?: string,
        @Query('sort') sort?: string,
    ) {
        return this.msisdnService.findAll(Number(page), Number(limit), status, search, sort);
    }

    /**
     * GET /msisdn/summary
     */
    @Get('summary')
    async getSummary() {
        return this.msisdnService.getSummary();
    }

    /**
     * GET /msisdn/download
     */
    @Get('download')
    async download(@Res() res: Response) {
        const buffer = await this.msisdnService.exportToExcel();
        const filename = `msisdn-data-${dayjs().format('YYYY-MM-DD')}.xlsx`;

        res.set({
            'Content-Type': 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
            'Content-Disposition': `attachment; filename="${filename}"`,
            'Content-Length': buffer.length,
        });

        res.end(buffer);
    }
}
