import { BetTypeEnum } from "~/@core/enums";

export interface DealHistoryDto {
  userId: string;
  user: {
    fullName: string;
  };
  inBetween: number;
  outBeyond: number;
  pair: number;
  trio: number;
  winAmount: number;
  lostAmount: number;
  roundResult: BetTypeEnum;
  dealNo: number;
  dateTime: Date;
  type: "chips" | "points";
}
