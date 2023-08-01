import { WithdrawalTypeEnum } from "~/@core/enums";

export interface WithdrawalRequestModel {
  userId: string;
  amount: number;
  type: WithdrawalTypeEnum;
}
