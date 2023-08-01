import { CardModel } from '@shared/models';
import { BaseResultClass } from './base-result.class';
import { BetTypeEnum } from '@core/enums';
import { CardLabelEnum } from '@shared/enums';

export class OutBeyondResultClass extends BaseResultClass {
  private firstCard: CardModel;

  constructor() {
    super(45, BetTypeEnum.OutBeyond);
  }

  generateRandomCardsOnDeck(): CardModel[] {
    this.firstCard = this.buildFirstCard();
    const thirdCard = this.buildThirdCard();
    const secondCard = this.buildSecondCard();

    return [this.firstCard, secondCard, thirdCard];
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
    const maxAndMinCardLabels = [CardLabelEnum.KING, CardLabelEnum.ACE];

    // If first card is KING or ACE then generate new card.
    if (
      maxAndMinCardLabels.includes(this.firstCard.label) &&
      maxAndMinCardLabels.includes(third.label)
    ) {
      return this.buildThirdCard();
    }

    // Remove all Cards between FirstCard and ThirdCard.
    const cardsToBeRemoved = this.cardsList.filter(
      (i) =>
        (i.value > this.firstCard.value && i.value < third.value) ||
        (this.firstCard.value > i.value && third.value < i.value) ||
        i.value === third.value,
    );

    this.removeCardsFromList(cardsToBeRemoved);

    return third;
  }
}
