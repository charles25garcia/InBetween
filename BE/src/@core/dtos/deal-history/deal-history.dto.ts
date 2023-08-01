import { BetTypeEnum, MoneyTypeEnum } from '@core/enums';
import { Expose } from 'class-transformer';
import { Tbl_User } from 'src/app/user';

export class DealHistoryDto {
  @Expose()
  user?: Tbl_User;

  @Expose()
  userId: string;

  @Expose()
  inBetween: number;

  @Expose()
  outBeyond: number;

  @Expose()
  pair: number;

  @Expose()
  trio: number;

  @Expose()
  winAmount: number;

  @Expose()
  lostAmount: number;

  @Expose()
  roundResult: BetTypeEnum;

  @Expose()
  dealNo: number;

  @Expose()
  dateTime?: Date;

  @Expose()
  type?: MoneyTypeEnum;
}
