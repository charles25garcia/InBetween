export function PayoutRatioComputer(totalChipsPerBet: number, grandTotalChips: number): number {
  const allocationPercentage = 0.1;
  const totalAllocation = grandTotalChips * allocationPercentage;
  const totalDividends = grandTotalChips - totalAllocation;

  const payoutRatio = totalDividends / totalChipsPerBet;

  // const playerEarned = Math.round(userChipsPerBet * payoutRatio);

  if (!totalChipsPerBet) {
    return 0;
  }

  return !payoutRatio ? 0 : +payoutRatio.toFixed(2) || 0;
}
