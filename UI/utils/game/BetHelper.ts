import { BetTypeEnum } from "~/@core/enums";
import { LockedBetModel } from "~/@shared/models";

export const BetHelper = {
  GetBetTypes(bets: { points: number; chips: number; betType: BetTypeEnum }[]) {
    const inBetween = bets.find((i) => i.betType === BetTypeEnum.InBetween);
    const outBeyond = bets.find((i) => i.betType === BetTypeEnum.OutBeyond);
    const pairs = bets.find((i) => i.betType === BetTypeEnum.Pairs);
    const trio = bets.find((i) => i.betType === BetTypeEnum.Trio);

    return {
      chips: {
        inBetween: inBetween?.chips || 0,
        outBeyond: outBeyond?.chips || 0,
        pair: pairs?.chips || 0,
        trio: trio?.chips || 0,
      },
      points: {
        inBetween: inBetween?.points || 0,
        outBeyond: outBeyond?.points || 0,
        pair: pairs?.points || 0,
        trio: trio?.points || 0,
      },
    } as LockedBetModel;
  },
};
