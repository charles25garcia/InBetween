import { BetTypeEnum } from '@core/enums';
import { BettingResultModel } from '@shared/models';

export abstract class BettingClass {
  amount: number;
  betType: BetTypeEnum;
  multiplier: number;

  constructor(amount: number, betType: BetTypeEnum, multiplier: number) {
    this.amount = amount;
    this.betType = betType;
    this.multiplier = multiplier;
  }

  getResult(isWinner: boolean): BettingResultModel {
    const bettingResult: BettingResultModel = {
      prizeAmount: 0,
      lostAmount: 0,
      isWinner,
      freePool: 0,
      freePoolToDeduct: 0,
    };

    if (isWinner) {
      bettingResult.prizeAmount = this.getPrize();
    } else {
      bettingResult.lostAmount = this.amount;
    }

    return bettingResult;
  }

  getPrize() {
    const playerEarned = this.amount;
    const addPrize = playerEarned * this.multiplier;
    return playerEarned + addPrize;
  }
}
