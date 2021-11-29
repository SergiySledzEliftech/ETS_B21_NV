import TransactionInterface from '../interfaces/transaction.interface';

export default class ReturnTransactionHistoryDto {
  readonly data: TransactionInterface[];
  readonly numberOfPages: number;
  readonly currentPage: string;
}
