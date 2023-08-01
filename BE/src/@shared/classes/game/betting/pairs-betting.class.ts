import { BetTypeEnum } from '@core/enums';
import { BettingInterface } from '@shared/interfaces';
import { BettingResultModel, BetTotalModel } from '@shared/models';
import { BettingClass } from './abstracts/betting.class';

export class PairsBettingClass
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
    currentFreePool: number,
  ): BettingResultModel {
    const result = this.getResult(roundResult === this.betType);

    if (roundResult === this.betType) {
      if (Object.keys(chipsBetsTotal).length > 0) {
        const playerEarned = this.getChipsPayout();
        result.prizeAmount = playerEarned;

        const freePool = this.getFreePool(totalChipsDeal, playerEarned);
        result.freePool = freePool;

        const totalPrizePool = totalChipsDeal + currentFreePool;

        if (playerEarned > totalPrizePool) {
          result.freePoolToDeduct = currentFreePool;
          result.prizeAmount = totalPrizePool;
        } else {
          result.freePoolToDeduct = this.getFreePoolToDeduct(
            playerEarned,
            totalChipsDeal,
          );
        }
      }
    }

    return result;
  }

  getChipsPayout(): number {
    return this.amount * 5;
  }

  getFreePool(playerEarned: number, totalChipsDeal: number): number {
    let freePool = 0;

    if (totalChipsDeal > playerEarned) {
      freePool = totalChipsDeal - playerEarned;
    }

    return freePool;
  }

  getFreePoolToDeduct(playerEarned: number, totalChipsDeal: number) {
    return Number(playerEarned) - Number(totalChipsDeal);
  }
}
