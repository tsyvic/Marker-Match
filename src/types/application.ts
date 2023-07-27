import { ApplicationStatus, ApplicationRole } from '@prisma/client';

export interface Application {
  id: string;
  applicantId: string;
  courseId: string;
  status: ApplicationStatus;
  relevantExperience: string;
  previousCourseGrade: string;
  desiredRole: ApplicationRole;
}
