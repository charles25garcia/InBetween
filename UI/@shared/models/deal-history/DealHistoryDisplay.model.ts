import { BetTypeEnum } from "~/@core/enums";

export interface DealHistoryDisplayModel {
  fullName: string;
  result: {
    type: BetTypeEnum;
    label: string;
    color: string;
  };
  lost: number;
  win: number;
  deals: string;
  dealNo: number;
  date: string;
}
