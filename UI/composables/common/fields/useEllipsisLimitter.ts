export function useEllipsisLimitter(value: any, maxLength = 6) {
  if (!value || value?.toString().length <= maxLength) {
    return value;
  }
  
  return value.toString().substring(0, maxLength) + '...';
}
