import { UserRoleEnum } from "~/@core/enums";

export interface UserStateModel {
  fullName: string;
  email: string;
  contactNo: string;
  username: string;
  isActive: boolean;
  lastUpdated: Date;
  roleId: UserRoleEnum;
}
