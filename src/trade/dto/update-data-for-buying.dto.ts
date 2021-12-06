import { Currency } from '../../user-currencies/schemas/currency.schema';

export class UpdateDataForBuyingDto {
  readonly rate: number;
  readonly amount: number;
  readonly currency: Currency;
  readonly currencyName: string;
  readonly userId: string;
  readonly spent: number;
  readonly currentDate: Date;
}