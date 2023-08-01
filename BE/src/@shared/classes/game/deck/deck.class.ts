import { BetTypeEnum } from '@core/enums';
import {
  InBetweenResultClass,
  OutBeyondResultClass,
  PairResultClass,
  TrioResultClass,
} from '@shared/classes';
import { CardListConst, RoundResultCheckersConst } from '@shared/constants';
import { CardModel } from '@shared/models';

export class DeckClass {
  private readonly totalCardsOnDeck = 3;
  private readonly totalCards = CardListConst.length;

  cardsOnDeck: CardModel[] = [];
  roundBetResult: BetTypeEnum | undefined;

  protected getResult(cardsOnDeck: CardModel[]) {
    if (cardsOnDeck.length < 1) {
      return undefined;
    }

    let result: BetTypeEnum;
    RoundResultCheckersConst.forEach((i) => {
      const betResult = i(cardsOnDeck);
      if (betResult !== undefined) {
        result = betResult;
        return;
      }
    });

    return result;
  }

  protected getRandomDeckResult() {
    const pickedIndex = Math.floor(Math.random() * 100);

    const inBetween = new InBetweenResultClass();
    const outBeyond = new OutBeyondResultClass();
    const pair = new PairResultClass();
    const trio = new TrioResultClass();

    if (pickedIndex < inBetween.chanceToBePick) {
      return inBetween;
    }

    if (
      pickedIndex >= inBetween.chanceToBePick &&
      inBetween.chanceToBePick + outBeyond.chanceToBePick > pickedIndex
    ) {
      return outBeyond;
    }

    if (
      pickedIndex >= inBetween.chanceToBePick + outBeyond.chanceToBePick &&
      pickedIndex < 99
    ) {
      return pair;
    }

    return trio;
  }

  protected shuffleCardsV2() {
    const randomDeckResult = this.getRandomDeckResult();

    this.roundBetResult = randomDeckResult.betType;

    this.cardsOnDeck = randomDeckResult.generateRandomCardsOnDeck();
  }

  protected shuffleCardsV1() {
    const cards: CardModel[] = [];
    let _cardsList = CardListConst;

    while (this.totalCardsOnDeck > cards.length) {
      const chosenId = this.pickCardId();

      const chosenCard = _cardsList.find((card) => card.id === chosenId);

      if (chosenCard) {
        cards.push(chosenCard);
        _cardsList = _cardsList.filter((card) => card.id !== chosenId);
      }
    }

    this.roundBetResult = this.getResult(cards);
    this.cardsOnDeck = cards;
  }

  protected pickCardId(): number {
    return Math.floor(Math.random() * this.totalCards);
  }
}
