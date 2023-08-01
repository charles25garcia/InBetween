import { Tbl_User_Bet_Locked } from 'src/app/user-bet-locked';

export interface UserStatsSseDto {
  userId: string;
  points: number;
  chips: number;
  userBets?: Tbl_User_Bet_Locked[];
  pointsLocked: boolean;
  chipsLocked: boolean;
  winstreakCount?: number;
}
