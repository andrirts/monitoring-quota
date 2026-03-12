-- CreateTable
CREATE TABLE "activity_log" (
    "id" SERIAL NOT NULL,
    "recorded_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "total_sim_cards" INTEGER NOT NULL,
    "status_active" INTEGER NOT NULL,
    "status_habis" INTEGER NOT NULL,
    "newly_exhausted" INTEGER NOT NULL,

    CONSTRAINT "activity_log_pkey" PRIMARY KEY ("id")
);
