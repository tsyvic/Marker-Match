import { User } from './user';

export interface UserContract {
  user_id: string;
  contract_id: string;
  contract?: UserContract | null;
  user?: User | null;
}
