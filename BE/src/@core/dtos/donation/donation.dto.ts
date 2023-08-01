import { CommonStatusEnum } from '@shared/enums';
import { Expose } from 'class-transformer';
import { Tbl_User } from 'src/app/user';

export class DonationDto {
  @Expose()
  id: number;

  @Expose()
  donorUserId: string;

  @Expose()
  doneeUserId: string;

  @Expose()
  dateTime: Date;

  @Expose()
  chips: number;

  @Expose()
  status: CommonStatusEnum;

  @Expose()
  donorUser: Tbl_User;

  @Expose()
  doneeUser: Tbl_User;
}
