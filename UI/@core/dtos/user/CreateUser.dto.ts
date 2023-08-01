import { UserRoleEnum } from "@core/enums";

export interface CreateUserDto {
  fullName: string;
  email: string;
  contactNo: string;
  username: string;
  password: string;
  lastUpdated: Date;
  referralById?: string;
  isActive?: boolean;
  roleId?: UserRoleEnum;
}
