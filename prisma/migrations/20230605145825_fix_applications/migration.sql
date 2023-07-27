/*
  Warnings:

  - A unique constraint covering the columns `[courseId,year,semester]` on the table `Application` will be added. If there are existing duplicate values, this will fail.

*/
-- AlterTable
ALTER TABLE "Applicant" ADD COLUMN     "auid" TEXT,
ADD COLUMN     "upi" TEXT;

-- CreateIndex
CREATE UNIQUE INDEX "Application_courseId_year_semester_key" ON "Application"("courseId", "year", "semester");
