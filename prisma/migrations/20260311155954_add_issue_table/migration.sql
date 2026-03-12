-- CreateTable
CREATE TABLE "Issue" (
    "id" TEXT NOT NULL,
    "issueType" TEXT NOT NULL,
    "description" TEXT,
    "photo" TEXT,
    "status" TEXT NOT NULL DEFAULT 'Pending',
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Issue_pkey" PRIMARY KEY ("id")
);
