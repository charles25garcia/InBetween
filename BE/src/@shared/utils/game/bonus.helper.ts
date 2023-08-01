export class BonusHelper {
  static getBetPotAmount(
    betAmount: number,
    allocationPercent: number,
    potBonusPercent: number,
  ) {
    const totalAllocation = betAmount * allocationPercent;
    const potAmount = totalAllocation * potBonusPercent;

    return potAmount;
  }

  // static getWinnerBonus() {}
}
