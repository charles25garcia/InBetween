import { CardModel } from '@shared/models';
import { BaseResultClass } from './base-result.class';
import { BetTypeEnum } from '@core/enums';

export class TrioResultClass extends BaseResultClass {
  constructor() {
    super(2, BetTypeEnum.Trio);
  }

  generateRandomCardsOnDeck(): CardModel[] {
    const firstCard = this.buildFirstCard();
    const secondCard = this.buildSecondCard();
    const thirdCard = this.buildThirdCard();

    return [firstCard, secondCard, thirdCard];
  }

  buildFirstCard(): CardModel {
    const first = this.getRandomCards();

    this.cardsList = this.cardsList.filter(
      (i) => i.value === first.value && i.id !== first.id,
    );

    return first;
  }

  buildSecondCard(): CardModel {
    const second = this.getRandomCards();

    this.removeCardsFromList([second]);

    return second;
  }

  buildThirdCard(): CardModel {
    const third = this.getRandomCards();

    return third;
  }
}
