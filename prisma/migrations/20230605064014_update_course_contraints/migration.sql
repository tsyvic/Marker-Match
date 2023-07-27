/*
  Warnings:

  - A unique constraint covering the columns `[name,year,semester]` on the table `Course` will be added. If there are existing duplicate values, this will fail.

*/
-- DropIndex
DROP INDEX "Course_name_key";

-- CreateIndex
CREATE UNIQUE INDEX "Course_name_year_semester_key" ON "Course"("name", "year", "semester");
