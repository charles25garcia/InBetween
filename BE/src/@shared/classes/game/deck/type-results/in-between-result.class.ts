import { CardModel } from '@shared/models';
import { BaseResultClass } from './base-result.class';
import { BetTypeEnum } from '@core/enums';

export class InBetweenResultClass extends BaseResultClass {
  private firstCard: CardModel;
  private thirdCard: CardModel;

  constructor() {
    super(45, BetTypeEnum.InBetween);
  }

  generateRandomCardsOnDeck(): CardModel[] {
    this.firstCard = this.buildFirstCard();
    this.thirdCard = this.buildThirdCard();
    const secondCard = this.buildSecondCard();

    return [this.firstCard, secondCard, this.thirdCard];
  }

  buildFirstCard(): CardModel {
    const first = this.getRandomCards();

    this.removeCardsFromList(this.getCardsWithSimilarValue(first.value));

    return first;
  }

  buildSecondCard(): CardModel {
    return this.getRandomCards();
  }

  buildThirdCard(): CardModel {
    const third = this.getRandomCards();

    // If ThirdCard is next or before, remove current card from cardList then generate new card.
    if (
      [this.firstCard.value + 1, this.firstCard.value - 1].includes(third.value)
    ) {
      return this.buildThirdCard();
    }

    const cardsToBeRemoved = this.cardsList.filter(
      (i) =>
        (i.value < this.firstCard.value && i.value < third.value) ||
        (i.value > third.value && i.value > this.firstCard.value) ||
        i.value === third.value,
    );

    this.removeCardsFromList(cardsToBeRemoved);

    return third;
  }
}
