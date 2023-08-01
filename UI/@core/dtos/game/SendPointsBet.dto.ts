import { DeckResultModel } from "~/@core/models";

export interface SendPointsBetDto {
  winStreakCount: number;
  points: number;
  result: DeckResultModel;
}
