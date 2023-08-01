export class NumberHelper {
  static to2Decimal(num: number) {
    return Math.round((num + Number.EPSILON) * 100) / 100;
  }
}
