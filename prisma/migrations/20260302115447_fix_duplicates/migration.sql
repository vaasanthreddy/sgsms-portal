/*
  Warnings:

  - You are about to drop the column `teacherId` on the `Attendance` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "Attendance" DROP CONSTRAINT "Attendance_teacherId_fkey";

-- AlterTable
ALTER TABLE "Attendance" DROP COLUMN "teacherId",
ADD COLUMN     "userId" TEXT;

-- AddForeignKey
ALTER TABLE "Attendance" ADD CONSTRAINT "Attendance_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE SET NULL ON UPDATE CASCADE;
