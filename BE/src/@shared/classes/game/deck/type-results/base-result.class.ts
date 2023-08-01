import { BetTypeEnum } from '@core/enums';
import { CardListConst } from '@shared/constants';
import { DeckResultInterface } from '@shared/interfaces';
import { CardModel } from '@shared/models';

export abstract class BaseResultClass implements DeckResultInterface {
  chanceToBePick: number;
  betType: BetTypeEnum;

  protected cardsList = CardListConst;

  constructor(chance: number, betType: BetTypeEnum) {
    if (this.chanceToBePick > 100) {
      throw new Error('Inavlid Bet Result chance ' + chance);
    }

    this.betType = betType;
    this.chanceToBePick = chance;
  }

  abstract generateRandomCardsOnDeck(): CardModel[];

  abstract buildFirstCard(): CardModel;
  abstract buildSecondCard(): CardModel;
  abstract buildThirdCard(): CardModel;

  protected pickCardId(): number {
    return Math.floor(Math.random() * this.cardsList.length);
  }

  protected getRandomCards() {
    const chosenIndex = this.pickCardId();
    const chosenCard = { ...this.cardsList[chosenIndex] };

    return chosenCard;
  }

  protected removeCardsFromList(cardsToBeRemoved: CardModel[]) {
    const cardIds = cardsToBeRemoved.map((i) => i.id);
    this.cardsList = this.cardsList.filter((i) => !cardIds.includes(i.id));
  }

  protected getCardsWithSimilarValue(...cardValue: number[]) {
    return this.cardsList.filter((i) => cardValue.includes(i.value));
  }
}
