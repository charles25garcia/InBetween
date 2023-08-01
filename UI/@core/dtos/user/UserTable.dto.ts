import { UserRoleEnum } from "~/@core/enums";

export interface UserTableDto {
  fullName: string;
  username: string;
  userRoleId: UserRoleEnum;
}
