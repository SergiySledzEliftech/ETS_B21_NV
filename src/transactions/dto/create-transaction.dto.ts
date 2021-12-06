export class CreateTransactionDto {
  userId: string;
  currencyName: string;
  amount: number;
  date: Date;
  rate: number;
  spent: number;
}
