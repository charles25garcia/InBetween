export function ArraySum(nums: number[], option = { isWhole: false }) {
  const total = nums.reduce((sum, curr) => sum + curr, 0);
  if (option.isWhole) {
    return total;
  }
  return Math.round(total);
}
