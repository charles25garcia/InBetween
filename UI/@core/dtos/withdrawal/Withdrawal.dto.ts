import { WithdrawalStatusEnum, WithdrawalTypeEnum } from "~/@core/enums";
import { UserTableDto } from "../user/UserTable.dto";

export interface WithdrawalDto {
  id: number;
  userId: string;
  amount: number;
  type: WithdrawalTypeEnum;
  approverUserId?: string;
  dateTime: Date;
  lastUpdate: Date;
  status: WithdrawalStatusEnum;
  approverComments?: string;
  user: UserTableDto;
  approver?: UserTableDto;
}
