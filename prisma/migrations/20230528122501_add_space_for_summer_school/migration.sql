/*
  Warnings:

  - The values [SummerSchool] on the enum `Semester` will be removed. If these variants are still used in the database, this will fail.

*/
-- AlterEnum
BEGIN;
CREATE TYPE "Semester_new" AS ENUM ('Semester1', 'Semester2', 'Summer_School');
ALTER TABLE "Course" ALTER COLUMN "semester" TYPE "Semester_new" USING ("semester"::text::"Semester_new");
ALTER TYPE "Semester" RENAME TO "Semester_old";
ALTER TYPE "Semester_new" RENAME TO "Semester";
DROP TYPE "Semester_old";
COMMIT;
