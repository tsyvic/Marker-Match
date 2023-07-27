import { Applicant } from './applicant';
import { CourseCoordinator } from './courseCoordinator';
import { UserContract } from './userContract';
import { UserCourse } from './userCourse';
import { Admin } from './admin';
import { Application } from './application';
import { Marker } from './marker';
import { Role } from './roles';
import { Tutor } from './tutor';

export interface User {
  id: string;
  email: string;
  password: string;
  access_token: string;
  refresh_token: string;
  first_name: string;
  last_name: string;
  role: Role;
  created_at: Date;
  updated_at: Date;
  applications: Application[];
  contracts: UserContract[];
  courses: UserCourse[];
  applicant: Applicant[];
  admins: Admin[];
  course_coordinators: CourseCoordinator[];
  tutors: Tutor[];
  markers: Marker[];
}

export interface UserValues {
  email: string;
  password: string;
  firstName: string;
  lastName: string;
}
