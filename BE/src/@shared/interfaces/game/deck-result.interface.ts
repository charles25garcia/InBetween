import { BetTypeEnum } from '@core/enums';
import { CardModel } from '@shared/models';

export interface DeckResultInterface {
  betType: BetTypeEnum;
  chanceToBePick: number;
  generateRandomCardsOnDeck(): CardModel[];
}
