-- CreateExtension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- CreateEnum
CREATE TYPE "Role" AS ENUM ('User', 'Admin');

-- CreateEnum
CREATE TYPE "ResidencyStatus" AS ENUM ('Resident', 'Non_Resident');

-- CreateEnum
CREATE TYPE "ApplicationRole" AS ENUM ('Tutor', 'Marker', 'CourseCoordinator');

-- CreateEnum
CREATE TYPE "ApplicationStatus" AS ENUM ('Accepted', 'Rejected', 'Pending');

-- CreateEnum
CREATE TYPE "Semester" AS ENUM ('Semester1', 'Semester2', 'SummerSchool');

-- CreateTable
CREATE TABLE "Contract" (
    "id" UUID NOT NULL DEFAULT uuid_generate_v4(),

    CONSTRAINT "Contract_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "UserContract" (
    "userId" UUID NOT NULL,
    "contractId" UUID NOT NULL,

    CONSTRAINT "UserContract_pkey" PRIMARY KEY ("userId","contractId")
);

-- CreateTable
CREATE TABLE "Account" (
    "id" UUID NOT NULL DEFAULT uuid_generate_v4(),
    "userId" UUID NOT NULL,
    "type" TEXT NOT NULL,
    "provider" TEXT NOT NULL,
    "providerAccountId" TEXT NOT NULL,
    "refresh_token" TEXT,
    "access_token" TEXT,
    "expires_at" INTEGER,
    "token_type" TEXT,
    "scope" TEXT,
    "id_token" TEXT,
    "session_state" TEXT,

    CONSTRAINT "Account_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Session" (
    "id" UUID NOT NULL DEFAULT uuid_generate_v4(),
    "sessionToken" TEXT NOT NULL,
    "userId" UUID NOT NULL,
    "expires" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Session_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "User" (
    "id" UUID NOT NULL DEFAULT uuid_generate_v4(),
    "email" TEXT NOT NULL,
    "firstName" TEXT NOT NULL,
    "lastName" TEXT NOT NULL,
    "emailVerified" TIMESTAMP(3),
    "image" TEXT,
    "role" "Role" NOT NULL DEFAULT 'User',
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Applicant" (
    "id" UUID NOT NULL DEFAULT uuid_generate_v4(),
    "userId" UUID NOT NULL,
    "overseas" BOOLEAN NOT NULL,
    "overseasReturnDate" TIMESTAMP(3),
    "residencyStatus" "ResidencyStatus" NOT NULL,
    "altContact" TEXT,
    "maxHours" INTEGER NOT NULL,
    "cv" TEXT,
    "unofficialTranscript" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Applicant_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Admin" (
    "id" UUID NOT NULL DEFAULT uuid_generate_v4(),
    "userId" UUID NOT NULL,

    CONSTRAINT "Admin_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "CourseCoordinator" (
    "id" UUID NOT NULL DEFAULT uuid_generate_v4(),
    "userId" UUID NOT NULL,

    CONSTRAINT "CourseCoordinator_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Tutor" (
    "id" UUID NOT NULL DEFAULT uuid_generate_v4(),
    "userId" UUID NOT NULL,

    CONSTRAINT "Tutor_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Marker" (
    "id" UUID NOT NULL DEFAULT uuid_generate_v4(),
    "userId" UUID NOT NULL,

    CONSTRAINT "Marker_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "UserCourse" (
    "userId" UUID NOT NULL,
    "courseId" UUID NOT NULL,

    CONSTRAINT "UserCourse_pkey" PRIMARY KEY ("userId","courseId")
);

-- CreateTable
CREATE TABLE "Course" (
    "id" UUID NOT NULL DEFAULT uuid_generate_v4(),
    "coordinatorId" UUID NOT NULL,
    "name" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "year" TEXT NOT NULL,
    "semester" "Semester" NOT NULL,
    "startDate" TIMESTAMP(3) NOT NULL,
    "endDate" TIMESTAMP(3) NOT NULL,
    "markersNeeded" INTEGER NOT NULL,
    "maxNoMarkers" INTEGER NOT NULL,
    "markingHours" INTEGER NOT NULL,
    "maxNoTutors" INTEGER NOT NULL,
    "tutorsNeeded" INTEGER NOT NULL,
    "tutorHours" INTEGER NOT NULL,
    "enrolledStudents" INTEGER NOT NULL,
    "numberOfAssignments" INTEGER NOT NULL,
    "responsibilities" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Course_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ApplicationCourse" (
    "applicationId" UUID NOT NULL,
    "courseId" UUID NOT NULL,

    CONSTRAINT "ApplicationCourse_pkey" PRIMARY KEY ("applicationId","courseId")
);

-- CreateTable
CREATE TABLE "UserApplication" (
    "userId" UUID NOT NULL,
    "applicationId" UUID NOT NULL,

    CONSTRAINT "UserApplication_pkey" PRIMARY KEY ("userId","applicationId")
);

-- CreateTable
CREATE TABLE "Application" (
    "id" UUID NOT NULL DEFAULT uuid_generate_v4(),
    "applicantId" UUID NOT NULL,
    "courseId" UUID NOT NULL,
    "status" "ApplicationStatus" NOT NULL DEFAULT 'Pending',
    "relevantExperience" TEXT NOT NULL,
    "previousCourseGrade" TEXT NOT NULL,
    "desiredRole" "ApplicationRole" NOT NULL,

    CONSTRAINT "Application_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Account_provider_providerAccountId_key" ON "Account"("provider", "providerAccountId");

-- CreateIndex
CREATE UNIQUE INDEX "Session_sessionToken_key" ON "Session"("sessionToken");

-- CreateIndex
CREATE UNIQUE INDEX "User_email_key" ON "User"("email");

-- CreateIndex
CREATE UNIQUE INDEX "Applicant_userId_key" ON "Applicant"("userId");

-- CreateIndex
CREATE UNIQUE INDEX "Admin_userId_key" ON "Admin"("userId");

-- CreateIndex
CREATE UNIQUE INDEX "CourseCoordinator_userId_key" ON "CourseCoordinator"("userId");

-- CreateIndex
CREATE UNIQUE INDEX "Tutor_userId_key" ON "Tutor"("userId");

-- CreateIndex
CREATE UNIQUE INDEX "Marker_userId_key" ON "Marker"("userId");

-- CreateIndex
CREATE UNIQUE INDEX "Course_name_key" ON "Course"("name");

-- AddForeignKey
ALTER TABLE "UserContract" ADD CONSTRAINT "UserContract_contractId_fkey" FOREIGN KEY ("contractId") REFERENCES "Contract"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "UserContract" ADD CONSTRAINT "UserContract_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Account" ADD CONSTRAINT "Account_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Session" ADD CONSTRAINT "Session_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Applicant" ADD CONSTRAINT "Applicant_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Admin" ADD CONSTRAINT "Admin_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "CourseCoordinator" ADD CONSTRAINT "CourseCoordinator_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Tutor" ADD CONSTRAINT "Tutor_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Marker" ADD CONSTRAINT "Marker_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "UserCourse" ADD CONSTRAINT "UserCourse_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "UserCourse" ADD CONSTRAINT "UserCourse_courseId_fkey" FOREIGN KEY ("courseId") REFERENCES "Course"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Course" ADD CONSTRAINT "Course_coordinatorId_fkey" FOREIGN KEY ("coordinatorId") REFERENCES "CourseCoordinator"("userId") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ApplicationCourse" ADD CONSTRAINT "ApplicationCourse_applicationId_fkey" FOREIGN KEY ("applicationId") REFERENCES "Application"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ApplicationCourse" ADD CONSTRAINT "ApplicationCourse_courseId_fkey" FOREIGN KEY ("courseId") REFERENCES "Course"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "UserApplication" ADD CONSTRAINT "UserApplication_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "UserApplication" ADD CONSTRAINT "UserApplication_applicationId_fkey" FOREIGN KEY ("applicationId") REFERENCES "Application"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Application" ADD CONSTRAINT "Application_applicantId_fkey" FOREIGN KEY ("applicantId") REFERENCES "Applicant"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
