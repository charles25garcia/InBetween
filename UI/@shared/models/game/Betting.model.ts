import { BetTypeEnum } from "~/@core/enums";

export interface BettingModel {
    isWinner: boolean;
    selectedBet: BetTypeEnum;
}
