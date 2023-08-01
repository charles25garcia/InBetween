import { WithdrawalStatusEnum } from "~/@core/enums";

export interface WithdrawalDisplayModel {
  status: WithdrawalStatusEnum;
  displayStatus: string;
}
