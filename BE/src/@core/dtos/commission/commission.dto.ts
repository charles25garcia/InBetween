import { Expose } from 'class-transformer';
import { Tbl_User } from 'src/app/user';

export class CommissionDto {
  @Expose()
  id: number;

  @Expose()
  userId: string;

  @Expose()
  amount: number;

  @Expose()
  lastUpdated: Date;

  @Expose()
  user: Tbl_User;
}
