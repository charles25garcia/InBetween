import { CardModel } from '@shared/models';
import { BaseResultClass } from './base-result.class';
import { BetTypeEnum } from '@core/enums';

export class PairResultClass extends BaseResultClass {
  private firstCard: CardModel;
  private secondCard: CardModel;

  constructor() {
    super(8, BetTypeEnum.Pairs);
  }

  generateRandomCardsOnDeck(): CardModel[] {
    this.firstCard = this.buildFirstCard();
    this.secondCard = this.buildSecondCard();
    const thirdCard = this.buildThirdCard();

    return [this.firstCard, this.secondCard, thirdCard];
  }

  buildFirstCard(): CardModel {
    const first = this.getRandomCards();

    this.removeCardsFromList([first]);

    return first;
  }

  buildSecondCard(): CardModel {
    const second = this.getRandomCards();

    this.removeCardsFromList([second]);

    return second;
  }

  buildThirdCard(): CardModel {
    const third = this.getRandomCards();

    if (
      this.firstCard.value !== this.secondCard.value &&
      ![this.firstCard.value, this.secondCard.value].includes(third.value)
    ) {
      this.cardsList = this.cardsList.filter(
        (i) =>
          i.value === this.firstCard.value || i.value === this.secondCard.value,
      );
      return this.buildThirdCard();
    }

    if (
      this.firstCard.value === third.value &&
      this.secondCard.value === third.value
    ) {
      return this.buildThirdCard();
    }

    return third;
  }
}
