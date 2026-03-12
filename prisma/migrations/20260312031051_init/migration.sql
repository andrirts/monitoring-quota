-- CreateTable
CREATE TABLE "msisdn" (
    "id" SERIAL NOT NULL,
    "no" INTEGER,
    "msisdn" TEXT NOT NULL,
    "sn" TEXT NOT NULL,
    "slot_simbank" INTEGER NOT NULL,
    "link_cek_kuota" TEXT NOT NULL,
    "no_dus" TEXT NOT NULL,
    "kuota" DOUBLE PRECISION NOT NULL DEFAULT 0,
    "used_quota" DOUBLE PRECISION NOT NULL DEFAULT 0,
    "remaining_quota" DOUBLE PRECISION NOT NULL DEFAULT 0,
    "last_scraped_at" TIMESTAMP(3),
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "msisdn_pkey" PRIMARY KEY ("id")
);
