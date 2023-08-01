export function useNumberLimiter(num: number, maxValue = 999) {
  if (maxValue >= num) {
    return num;
  }

  return `${maxValue}+`;
}
