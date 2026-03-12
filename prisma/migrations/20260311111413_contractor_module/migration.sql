/*
  Warnings:

  - You are about to drop the column `complaints` on the `Contractor` table. All the data in the column will be lost.
  - You are about to drop the column `onTimeDelivery` on the `Contractor` table. All the data in the column will be lost.
  - Added the required column `complaintsCount` to the `Contractor` table without a default value. This is not possible if the table is not empty.
  - Added the required column `deliveryPercent` to the `Contractor` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Contractor" DROP COLUMN "complaints",
DROP COLUMN "onTimeDelivery",
ADD COLUMN     "complaintsCount" INTEGER NOT NULL,
ADD COLUMN     "deliveryPercent" DOUBLE PRECISION NOT NULL;

-- CreateTable
CREATE TABLE "Delivery" (
    "id" TEXT NOT NULL,
    "date" TIMESTAMP(3) NOT NULL,
    "breakfast" BOOLEAN NOT NULL,
    "lunch" BOOLEAN NOT NULL,
    "snacks" BOOLEAN NOT NULL,
    "dinner" BOOLEAN NOT NULL,
    "status" TEXT NOT NULL,
    "contractorId" TEXT NOT NULL,

    CONSTRAINT "Delivery_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Complaint" (
    "id" TEXT NOT NULL,
    "issue" TEXT NOT NULL,
    "status" TEXT NOT NULL,
    "date" TIMESTAMP(3) NOT NULL,
    "contractorId" TEXT NOT NULL,

    CONSTRAINT "Complaint_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Inspection" (
    "id" TEXT NOT NULL,
    "date" TIMESTAMP(3) NOT NULL,
    "officer" TEXT NOT NULL,
    "grade" TEXT NOT NULL,
    "remarks" TEXT NOT NULL,
    "contractorId" TEXT NOT NULL,

    CONSTRAINT "Inspection_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "SchoolCoverage" (
    "id" TEXT NOT NULL,
    "schoolId" TEXT NOT NULL,
    "schoolName" TEXT NOT NULL,
    "students" INTEGER NOT NULL,
    "contractorId" TEXT NOT NULL,

    CONSTRAINT "SchoolCoverage_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Delivery" ADD CONSTRAINT "Delivery_contractorId_fkey" FOREIGN KEY ("contractorId") REFERENCES "Contractor"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Complaint" ADD CONSTRAINT "Complaint_contractorId_fkey" FOREIGN KEY ("contractorId") REFERENCES "Contractor"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Inspection" ADD CONSTRAINT "Inspection_contractorId_fkey" FOREIGN KEY ("contractorId") REFERENCES "Contractor"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "SchoolCoverage" ADD CONSTRAINT "SchoolCoverage_contractorId_fkey" FOREIGN KEY ("contractorId") REFERENCES "Contractor"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
