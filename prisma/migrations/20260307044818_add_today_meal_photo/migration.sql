/*
  Warnings:

  - You are about to drop the `TodayMealPhoto` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropTable
DROP TABLE "TodayMealPhoto";

-- CreateTable
CREATE TABLE "todayMealPhoto" (
    "id" TEXT NOT NULL,
    "schoolId" TEXT NOT NULL,
    "mealType" TEXT NOT NULL,
    "itemName" TEXT NOT NULL,
    "photoUrl" TEXT NOT NULL,
    "date" TIMESTAMP(3) NOT NULL,
    "submittedBy" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "todayMealPhoto_pkey" PRIMARY KEY ("id")
);
