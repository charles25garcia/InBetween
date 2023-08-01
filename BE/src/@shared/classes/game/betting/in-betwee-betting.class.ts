import { BetTypeEnum } from '@core/enums';
import { BettingInterface } from '@shared/interfaces';
import { BetTotalModel, BettingResultModel } from '@shared/models';
import { BettingClass } from './abstracts/betting.class';

export class InBetweenBettingClass
  extends BettingClass
  implements BettingInterface
{
  amount: number;
  betType: BetTypeEnum;

  constructor(amount: number, betType: BetTypeEnum, multiplier: number) {
    super(amount, betType, multiplier);
    this.amount = amount;
    this.betType = betType;
  }

  generateResult(
    roundResult: BetTypeEnum,
    chipsBetsTotal: BetTotalModel,
    totalChipsDeal: number,
  ): BettingResultModel {
    const result = this.getResult(roundResult === this.betType);

    if (roundResult === this.betType) {
      if (Object.keys(chipsBetsTotal).length > 0) {
        const playerEarned = this.getChipsPayout(
          totalChipsDeal,
          chipsBetsTotal,
        );
        result.prizeAmount = playerEarned;
      }
    }

    return result;
  }

  getChipsPayout(
    totalChipsDeal: number,
    chipsBetsTotal: BetTotalModel,
  ): number {
    const allocationPercentage = 0.1;
    const totalAllocation = totalChipsDeal * allocationPercentage;
    const totalDividends = totalChipsDeal - totalAllocation;

    const payoutRatio = totalDividends / chipsBetsTotal[BetTypeEnum.InBetween];

    const playerEarned = Math.round(this.amount * payoutRatio);

    return playerEarned;
  }
}
