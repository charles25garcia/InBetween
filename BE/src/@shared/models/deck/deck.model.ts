import { DeckModeEnum } from '@shared/enums';
import { CardModel } from './card.model';

export interface DeckModel {
  timer: number;
  mode: DeckModeEnum;
  cards: CardModel[];
}
