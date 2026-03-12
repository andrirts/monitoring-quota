import { IsString, IsNumber, IsOptional } from 'class-validator';
import { Type } from 'class-transformer';

export class BulkUploadItemDto {
    @IsString()
    msisdn: string;

    @IsString()
    sn: string;

    @Type(() => Number)
    @IsNumber()
    slotSimbank: number;

    @IsString()
    linkCekKuota: string;

    @IsString()
    noDus: string;

    @Type(() => Number)
    @IsNumber()
    kuota: number;

    @IsOptional()
    @Type(() => Number)
    @IsNumber()
    usedQuota?: number;

    @IsOptional()
    @Type(() => Number)
    @IsNumber()
    remainingQuota?: number;
}
