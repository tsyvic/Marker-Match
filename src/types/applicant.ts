import { Application } from './application';
import { ResidencyStatus } from './residencyStatus';
import { User } from './user';

export interface Applicant {
  id: string;
  user: User;
  user_id: string;
  overseas: boolean;
  overseas_return_date?: Date | null;
  residency_status: ResidencyStatus;
  alt_contact?: string | null;
  max_hours: number;
  cv?: string | null;
  unofficial_transcript?: string | null;
  created_at: Date;
  updated_at: Date;
  application: Application[];
}
