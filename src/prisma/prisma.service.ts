import { Injectable, OnModuleInit, OnModuleDestroy } from '@nestjs/common';
import { PrismaClient } from '../generated/prisma/client';
import { PrismaPg } from '@prisma/adapter-pg';

@Injectable()
export class PrismaService implements OnModuleInit, OnModuleDestroy {
    public client: InstanceType<typeof PrismaClient>;

    constructor() {
        const adapter = new PrismaPg({
            connectionString: process.env.DATABASE_URL!,
        });
        this.client = new PrismaClient({ adapter } as any);
    }

    async onModuleInit() {
        await this.client.$connect();
    }

    async onModuleDestroy() {
        await this.client.$disconnect();
    }

    get msisdn() {
        return this.client.msisdn;
    }
}
