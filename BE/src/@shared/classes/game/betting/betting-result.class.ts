import { BettingResultModel } from '@shared/models';

export class BettingResultClass {
  bets: BettingResultModel[];
  result: BettingResultModel;

  constructor(bets: BettingResultModel[]) {
    this.bets = bets;

    this.result = this.generateFinalResult();
  }

  generateFinalResult(): BettingResultModel {
    const result = this.mixResults(this.bets);
    return result;
  }

  mixResults(results: BettingResultModel[]): BettingResultModel {
    const betResult: BettingResultModel = {
      isWinner: !results.some((i) => !i.isWinner),
      lostAmount: 0,
      prizeAmount: 0,
      freePool: 0,
      freePoolToDeduct: 0,
    };

    for (let index = 0; index < results.length; index++) {
      const result = results[index];

      betResult.prizeAmount += result.prizeAmount;
      betResult.lostAmount += result.lostAmount;
      betResult.freePool = result.freePool;
      betResult.freePoolToDeduct = result.freePoolToDeduct;
    }

    return betResult;
  }
}
