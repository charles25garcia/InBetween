import { BetTypeEnum } from '@core/enums';

export interface BetModel {
  amount: number;
  type: BetTypeEnum;
  multiplier?: number;
}
