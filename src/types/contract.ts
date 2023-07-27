import { UserContract } from '@prisma/client';

export interface Contract {
  id: string;
  user_contract: UserContract[];
}
