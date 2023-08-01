import { WithdrawalStatusEnum } from "~/@core/enums";

export interface UpdateWithdrawalDto {
  id: number;

  userId: string;

  status: WithdrawalStatusEnum;

  comment: string;
}
