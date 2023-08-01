import { CommonStatusEnum } from "@shared/enums";

export class UpdateWithdrawalDto {
  id: number;
  userId: string;
  status: CommonStatusEnum;
  comment: string;
}
