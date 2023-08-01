import { WithdrawalTypeEnum } from '@core/enums';
import { CommonStatusEnum } from '@shared/enums';
import { Expose } from 'class-transformer';
import { Tbl_User } from 'src/app/user';

export class WithdrawalDto {
  @Expose()
  id: number;

  @Expose()
  userId: string;

  @Expose()
  amount: number;

  @Expose()
  type: WithdrawalTypeEnum;

  @Expose()
  approverUserId?: string;

  @Expose()
  dateTime?: Date;

  @Expose()
  lastUpdate?: Date;

  @Expose()
  status?: CommonStatusEnum;

  @Expose()
  approverComments?: string;

  @Expose()
  user?: Tbl_User;

  @Expose()
  approver?: Tbl_User;
}
