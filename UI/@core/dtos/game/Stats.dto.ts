import { LockedBetModel } from "~/@shared/models";

export interface StatsDto {
  points: number;
  chips: number;
  winStreakCount?: number;
  bets?: LockedBetModel;
  pointsLocked?: boolean;
  chipsLocked?: boolean;
}
