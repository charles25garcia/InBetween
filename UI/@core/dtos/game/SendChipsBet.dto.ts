import { DeckResultModel } from "~/@core/models";

export interface SendChipsBetDto {
  winStreakCount: number;
  chips: number;
  result: DeckResultModel;
}
