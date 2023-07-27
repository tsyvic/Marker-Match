import { Application } from './application';
import { User } from './user';

export interface UserApplication {
  user: User;
  userId: string;
  application: Application;
  applicationId: string;
}
