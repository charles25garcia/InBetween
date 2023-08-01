import { BetTypeEnum } from '@core/enums';
import { BettingInterface } from '@shared/interfaces';
import {
  InBetweenBettingClass,
  OutBeyondBettingClass,
  PairsBettingClass,
  TrioBettingClass,
} from '@shared/classes';

export const BettingTypesConst: {
  type: BetTypeEnum;
  betting: (amount: number, multiplier: number) => BettingInterface;
}[] = [
  {
    type: BetTypeEnum.InBetween,
    betting: (amount: number, multiplier: number): BettingInterface =>
      new InBetweenBettingClass(amount, BetTypeEnum.InBetween, multiplier),
  },
  {
    type: BetTypeEnum.OutBeyond,
    betting: (amount: number, multiplier: number): BettingInterface =>
      new OutBeyondBettingClass(amount, BetTypeEnum.OutBeyond, multiplier),
  },
  {
    type: BetTypeEnum.Pairs,
    betting: (amount: number, multiplier: number): BettingInterface =>
      new PairsBettingClass(amount, BetTypeEnum.Pairs, multiplier),
  },
  {
    type: BetTypeEnum.Trio,
    betting: (amount: number, multiplier: number): BettingInterface =>
      new TrioBettingClass(amount, BetTypeEnum.Trio, multiplier),
  },
];
