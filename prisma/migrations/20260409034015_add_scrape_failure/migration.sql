-- AlterTable
ALTER TABLE "activity_log" ADD COLUMN     "scrape_failed" INTEGER NOT NULL DEFAULT 0,
ADD COLUMN     "scrape_success" INTEGER NOT NULL DEFAULT 0,
ADD COLUMN     "scrape_total" INTEGER NOT NULL DEFAULT 0;

-- AlterTable
ALTER TABLE "msisdn" ADD COLUMN     "city" TEXT NOT NULL DEFAULT 'All Location';

-- CreateTable
CREATE TABLE "activity_log_city" (
    "id" SERIAL NOT NULL,
    "activity_log_id" INTEGER NOT NULL,
    "city" TEXT NOT NULL,
    "newly_exhausted" INTEGER NOT NULL,

    CONSTRAINT "activity_log_city_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "scrape_failure" (
    "id" SERIAL NOT NULL,
    "activity_log_id" INTEGER NOT NULL,
    "msisdn" TEXT NOT NULL DEFAULT '',
    "url" TEXT NOT NULL,
    "error_message" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "scrape_failure_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "msisdn_msisdn_idx" ON "msisdn"("msisdn");

-- AddForeignKey
ALTER TABLE "activity_log_city" ADD CONSTRAINT "activity_log_city_activity_log_id_fkey" FOREIGN KEY ("activity_log_id") REFERENCES "activity_log"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "scrape_failure" ADD CONSTRAINT "scrape_failure_activity_log_id_fkey" FOREIGN KEY ("activity_log_id") REFERENCES "activity_log"("id") ON DELETE CASCADE ON UPDATE CASCADE;
