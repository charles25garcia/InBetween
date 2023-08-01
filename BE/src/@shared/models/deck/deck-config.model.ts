import { DeckModeEnum } from '@shared/enums';
import { CardModel } from './card.model';
import { BetTypeEnum } from '@core/enums';
export interface DeckConfigModel {
  timer: number;
  mode: DeckModeEnum;
  betResult?: BetTypeEnum;
  cardIndexes: string;
  cardsOnDeck: CardModel[];
  roundId: string;
  dealNumber: number;
  date: string;
}
