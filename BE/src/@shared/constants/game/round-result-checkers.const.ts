import { BetTypeEnum } from '@core/enums';
import { CardModel } from '@shared/models';

export const RoundResultCheckersConst: ((
  cards: CardModel[],
) => BetTypeEnum | undefined)[] = [
  ([leftCard, middleCard, rightCard]: CardModel[]) => {
    let isWinner = false;

    if (
      middleCard.value > leftCard.value &&
      middleCard.value < rightCard.value
    ) {
      isWinner = true;
    }

    if (
      middleCard.value < leftCard.value &&
      middleCard.value > rightCard.value
    ) {
      isWinner = true;
    }

    if (isWinner) {
      return BetTypeEnum.InBetween;
    }

    return undefined;
  },
  ([leftCard, middleCard, rightCard]: CardModel[]) => {
    let isWinner = false;

    if (
      middleCard.value > leftCard.value &&
      middleCard.value > rightCard.value
    ) {
      isWinner = true;
    }

    if (
      middleCard.value < leftCard.value &&
      middleCard.value < rightCard.value
    ) {
      isWinner = true;
    }

    if (rightCard.value === leftCard.value) {
      isWinner = false;
    }

    if (isWinner) {
      return BetTypeEnum.OutBeyond;
    }

    return undefined;
  },
  (cards: CardModel[]) => {
    let isWinner = false;

    const cardValues = cards.map((i) => i.value);

    cardValues.forEach((i) => {
      const valueCount = cardValues.filter((value) => i === value).length;

      if (valueCount === 2) {
        isWinner = true;
        return;
      }
    });

    if (isWinner) {
      return BetTypeEnum.Pairs;
    }

    return undefined;
  },
  (cards: CardModel[]) => {
    let isWinner = false;

    const cardValues = cards.map((i) => i.value);

    cardValues.forEach((i) => {
      const valueCount = cardValues.filter((value) => i === value).length;

      if (valueCount === 3) {
        isWinner = true;
        return;
      }
    });

    if (isWinner) {
      return BetTypeEnum.Trio;
    }

    return undefined;
  },
];
