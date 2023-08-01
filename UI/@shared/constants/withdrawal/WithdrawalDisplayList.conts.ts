import { WithdrawalStatusEnum } from "~/@core/enums";
import { WithdrawalDisplayModel } from "~/@core/models";

export const WithdrawalDisplayListConst: WithdrawalDisplayModel[] = [
  {
    displayStatus: "Approved",
    status: WithdrawalStatusEnum.APPROVED,
  },
  {
    displayStatus: "Cancelled",
    status: WithdrawalStatusEnum.CANCELLED,
  },
  {
    displayStatus: "Declined",
    status: WithdrawalStatusEnum.DECLINED,
  },
  {
    displayStatus: "Pending",
    status: WithdrawalStatusEnum.PENDING,
  },
];
