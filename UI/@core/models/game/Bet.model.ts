import { BetTypeEnum } from "~/@core/enums";

export interface BetModel {
  type: BetTypeEnum;
  amount: number;
  multiplier?: number;
}
