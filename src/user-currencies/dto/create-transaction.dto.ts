export class CreateTransactionDto {
  userId: number;
  currencyName: string;
  amount: number;
  date: Date;
  rate: number;
  spent: number;
}
