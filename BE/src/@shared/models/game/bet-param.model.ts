import { BetModel } from './bet.model';

export interface BetParamModel {
  userId: string;
  bets: BetModel[];
}
