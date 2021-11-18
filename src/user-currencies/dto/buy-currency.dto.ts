export class BuyCurrencyDto {
  readonly currencyName: string;
  readonly expectedCurrencyAmount: number;
  readonly userId: number;
  readonly spent: number;
}