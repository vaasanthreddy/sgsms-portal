/*
  Warnings:

  - You are about to drop the `todayMealPhoto` table. If the table is not empty, all the data it contains will be lost.
  - A unique constraint covering the columns `[studentId,meal,date]` on the table `Attendance` will be added. If there are existing duplicate values, this will fail.

*/
-- AlterTable
ALTER TABLE "Attendance" ALTER COLUMN "date" DROP DEFAULT;

-- DropTable
DROP TABLE "todayMealPhoto";

-- CreateTable
CREATE TABLE "TodayMealPhoto" (
    "id" TEXT NOT NULL,
    "schoolId" TEXT NOT NULL,
    "mealType" TEXT NOT NULL,
    "itemName" TEXT NOT NULL,
    "photoUrl" TEXT NOT NULL,
    "date" TIMESTAMP(3) NOT NULL,
    "submittedBy" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "TodayMealPhoto_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Contractor" (
    "id" TEXT NOT NULL,
    "contractorId" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "startDate" TIMESTAMP(3) NOT NULL,
    "endDate" TIMESTAMP(3) NOT NULL,
    "mealsProvided" TEXT NOT NULL,
    "kitchenLocation" TEXT NOT NULL,
    "hygieneRating" TEXT NOT NULL,
    "totalStudents" INTEGER NOT NULL,
    "contactPerson" TEXT NOT NULL,
    "phone" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "address" TEXT NOT NULL,
    "onTimeDelivery" DOUBLE PRECISION NOT NULL,
    "complaints" INTEGER NOT NULL,
    "feedbackRating" DOUBLE PRECISION NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Contractor_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Contractor_contractorId_key" ON "Contractor"("contractorId");

-- CreateIndex
CREATE UNIQUE INDEX "Attendance_studentId_meal_date_key" ON "Attendance"("studentId", "meal", "date");
