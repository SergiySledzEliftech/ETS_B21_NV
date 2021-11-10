export class UserCurrencyDto {
  readonly userId: string;
  readonly name: string;
  readonly purchaseDate: Date;
  readonly amount: number;
  readonly iconURL: string;
}