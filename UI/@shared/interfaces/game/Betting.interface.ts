import { BetTypeEnum } from "~/@core/enums";
import { CardModel } from "~/@core/models";
import { BettingModel } from "~/@shared/models";

export interface BettingInterface {
  betType: BetTypeEnum;
  amount: number;
  generateResult(cards: CardModel[]): BettingModel;
}
