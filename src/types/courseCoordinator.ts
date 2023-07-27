import { ICourses } from './courses';
import { User } from './user';

export interface CourseCoordinator {
  id: string;
  user: User;
  user_id: string;
  course: ICourses[];
}
