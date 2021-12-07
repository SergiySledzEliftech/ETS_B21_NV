import { ApiProperty } from '@nestjs/swagger';
import TransactionInterface from '../interfaces/transaction.interface';

export default class ReturnTransactionHistoryDto {
  @ApiProperty()
  readonly data: TransactionInterface[];
  
  @ApiProperty()
  readonly numberOfPages: number;
  
  @ApiProperty()
  readonly currentPage: string;
}
