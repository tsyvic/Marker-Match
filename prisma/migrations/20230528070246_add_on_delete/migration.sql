-- DropForeignKey
ALTER TABLE "Admin" DROP CONSTRAINT "Admin_userId_fkey";

-- DropForeignKey
ALTER TABLE "Applicant" DROP CONSTRAINT "Applicant_userId_fkey";

-- DropForeignKey
ALTER TABLE "Application" DROP CONSTRAINT "Application_applicantId_fkey";

-- DropForeignKey
ALTER TABLE "ApplicationCourse" DROP CONSTRAINT "ApplicationCourse_applicationId_fkey";

-- DropForeignKey
ALTER TABLE "ApplicationCourse" DROP CONSTRAINT "ApplicationCourse_courseId_fkey";

-- DropForeignKey
ALTER TABLE "Course" DROP CONSTRAINT "Course_coordinatorId_fkey";

-- DropForeignKey
ALTER TABLE "CourseCoordinator" DROP CONSTRAINT "CourseCoordinator_userId_fkey";

-- DropForeignKey
ALTER TABLE "Marker" DROP CONSTRAINT "Marker_userId_fkey";

-- DropForeignKey
ALTER TABLE "Tutor" DROP CONSTRAINT "Tutor_userId_fkey";

-- DropForeignKey
ALTER TABLE "UserApplication" DROP CONSTRAINT "UserApplication_applicationId_fkey";

-- DropForeignKey
ALTER TABLE "UserApplication" DROP CONSTRAINT "UserApplication_userId_fkey";

-- DropForeignKey
ALTER TABLE "UserContract" DROP CONSTRAINT "UserContract_contractId_fkey";

-- DropForeignKey
ALTER TABLE "UserContract" DROP CONSTRAINT "UserContract_userId_fkey";

-- DropForeignKey
ALTER TABLE "UserCourse" DROP CONSTRAINT "UserCourse_courseId_fkey";

-- DropForeignKey
ALTER TABLE "UserCourse" DROP CONSTRAINT "UserCourse_userId_fkey";

-- AddForeignKey
ALTER TABLE "UserContract" ADD CONSTRAINT "UserContract_contractId_fkey" FOREIGN KEY ("contractId") REFERENCES "Contract"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "UserContract" ADD CONSTRAINT "UserContract_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Applicant" ADD CONSTRAINT "Applicant_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Admin" ADD CONSTRAINT "Admin_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "CourseCoordinator" ADD CONSTRAINT "CourseCoordinator_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Tutor" ADD CONSTRAINT "Tutor_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Marker" ADD CONSTRAINT "Marker_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "UserCourse" ADD CONSTRAINT "UserCourse_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "UserCourse" ADD CONSTRAINT "UserCourse_courseId_fkey" FOREIGN KEY ("courseId") REFERENCES "Course"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Course" ADD CONSTRAINT "Course_coordinatorId_fkey" FOREIGN KEY ("coordinatorId") REFERENCES "CourseCoordinator"("userId") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ApplicationCourse" ADD CONSTRAINT "ApplicationCourse_applicationId_fkey" FOREIGN KEY ("applicationId") REFERENCES "Application"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ApplicationCourse" ADD CONSTRAINT "ApplicationCourse_courseId_fkey" FOREIGN KEY ("courseId") REFERENCES "Course"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "UserApplication" ADD CONSTRAINT "UserApplication_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "UserApplication" ADD CONSTRAINT "UserApplication_applicationId_fkey" FOREIGN KEY ("applicationId") REFERENCES "Application"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Application" ADD CONSTRAINT "Application_applicantId_fkey" FOREIGN KEY ("applicantId") REFERENCES "Applicant"("id") ON DELETE CASCADE ON UPDATE CASCADE;
