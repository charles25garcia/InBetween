import { UserRoleEnum } from "@core/enums";
import { CommissionModel } from "~/@shared/models";

export interface UserDto {
  id: string;
  fullName: string;
  email: string;
  contactNo: string;
  username: string;
  isActive: boolean;
  lastUpdated: Date;
  userRoleId: UserRoleEnum;
  dateOfRegistration: Date;
  userRole: {
    id: UserRoleEnum;
    roleDescription: string;
  };
  userStats: {
    points: number;
    chips: number;
    lastUpdatedDateTime: string;
  };
  commission: CommissionModel;
}
