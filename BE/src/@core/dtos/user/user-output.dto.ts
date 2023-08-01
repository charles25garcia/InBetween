import { UserRoleEnum } from '@core/enums';
import { Expose } from 'class-transformer';

export class UserOutputDto {
  @Expose()
  id: string;

  @Expose()
  fullName: string;

  @Expose()
  email: string;

  @Expose()
  contactNo: string;

  @Expose()
  username: string;

  @Expose()
  isActive: boolean;

  @Expose()
  lastUpdated: Date;

  @Expose()
  userRoleId: UserRoleEnum;

  @Expose()
  dateOfRegistration: Date;

  @Expose()
  userRole: {
    id: number;
    roleDescription: string;
    defaultFeatureId: string;
  };

  @Expose()
  userStats: {
    points: number;
    chips: number;
    lastUpdatedDateTime: string;
  };

  @Expose()
  commission: {
    amount: number;
    lastUpdated: Date;
    id: number;
  };
}
