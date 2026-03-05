/*
  Warnings:

  - Added the required column `className` to the `Attendance` table without a default value. This is not possible if the table is not empty.
  - Added the required column `meal` to the `Attendance` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Attendance" ADD COLUMN     "className" TEXT NOT NULL,
ADD COLUMN     "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "meal" TEXT NOT NULL,
ADD COLUMN     "photo" TEXT,
ALTER COLUMN "date" SET DEFAULT CURRENT_TIMESTAMP;
