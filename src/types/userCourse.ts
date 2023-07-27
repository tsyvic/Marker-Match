import { ICourses } from './courses';
import { User } from './user';

export interface UserCourse {
  user: User;
  user_id: string;
  course: ICourses;
  course_id: string;
}
