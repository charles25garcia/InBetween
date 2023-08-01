import { BettingTypesConst } from '@shared/constants';
import { BettingInterface } from '@shared/interfaces';
import { BetModel } from '@shared/models';

export const BettingBuilder = ({
  type,
  amount,
  multiplier,
}: BetModel): BettingInterface => {
  return BettingTypesConst.find((i) => i.type === type).betting(
    amount,
    multiplier || 0,
  );
};
