-- CreateEnum
CREATE TYPE "Grade" AS ENUM ('B_Minus', 'B', 'B_Plus', 'A_Minus', 'A', 'A_Plus');

-- AlterTable
ALTER TABLE "Application" ADD COLUMN     "semester" "Semester" NOT NULL DEFAULT 'Semester1',
ADD COLUMN     "year" TEXT NOT NULL DEFAULT '2023';

-- AlterTable
ALTER TABLE "Course" ADD COLUMN     "minGrade" "Grade";
