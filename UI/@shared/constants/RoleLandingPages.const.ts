import { UserRoleEnum } from "~/@core/enums";

export const RoleLadingPages = [
  {
    roleId: UserRoleEnum.ADMIN,
    landingPage: "/dashboard",
  },
  {
    roleId: UserRoleEnum.PLATINUM,
    landingPage: "/platinum/dashboard",
  },
  {
    roleId: UserRoleEnum.GOLD,
    landingPage: "/gold/dashboard",
  },
  {
    roleId: UserRoleEnum.SILVER,
    landingPage: "/game",
  },
];
