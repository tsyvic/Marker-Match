import { Application } from './application';
import { ICourses } from './courses';

export interface ApplicationCourse {
  application: Application;
  applicationId: string;
  course: ICourses;
  courseId: string;
}
