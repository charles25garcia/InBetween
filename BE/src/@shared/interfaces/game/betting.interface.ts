import { BetTypeEnum } from '@core/enums';
import { BetTotalModel, BettingResultModel } from '@shared/models';

export interface BettingInterface {
  betType: BetTypeEnum;
  amount: number;
  multiplier: number;
  generateResult(
    roundResult: BetTypeEnum,
    chipsBetsTotal: BetTotalModel,
    totalChipsDeal: number,
    currentFreePool?: number,
  ): BettingResultModel;
  getChipsPayout(totalChipsDeal: number, chipsBetTotal: BetTotalModel): number;
}
