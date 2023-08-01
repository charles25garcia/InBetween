export function useNumberSummarizer(numbers: number[]) {
  return numbers.reduce((sum, curr) => sum + curr, 0);
}
