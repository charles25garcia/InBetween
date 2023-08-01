import { BetTypeEnum, DeckModeEnum } from "~/@core/enums";
import { CardModel } from "./Card.model";

export interface DeckConfigModel {
  timer: number;
  mode: DeckModeEnum;
  betResult?: BetTypeEnum;
  cardsOnDeck: CardModel[];
  dealNumber: number;
}
