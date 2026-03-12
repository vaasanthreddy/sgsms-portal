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
