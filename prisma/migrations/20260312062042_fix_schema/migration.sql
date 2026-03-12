/*
  Warnings:

  - You are about to drop the column `issueType` on the `Issue` table. All the data in the column will be lost.
  - Added the required column `date` to the `Issue` table without a default value. This is not possible if the table is not empty.
  - Added the required column `issueName` to the `Issue` table without a default value. This is not possible if the table is not empty.
  - Made the column `description` on table `Issue` required. This step will fail if there are existing NULL values in that column.
  - Made the column `photo` on table `Issue` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "Issue" DROP COLUMN "issueType",
ADD COLUMN     "date" TEXT NOT NULL,
ADD COLUMN     "issueName" TEXT NOT NULL,
ALTER COLUMN "description" SET NOT NULL,
ALTER COLUMN "photo" SET NOT NULL,
ALTER COLUMN "status" DROP DEFAULT;

-- CreateIndex
CREATE INDEX "Attendance_date_className_idx" ON "Attendance"("date", "className");
