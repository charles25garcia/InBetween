import { UserRoleEnum } from '../../enums';

export class CreateUserDto {
  id: string;
  fullName: string;
  email: string;
  contactNo: string;
  username: string;
  password: string;
  isActive: boolean;
  lastUpdated: Date;
  referralById?: string;
  roleId: UserRoleEnum;
}
