import { Controller, Get, Query } from '@nestjs/common';
import { Transaction } from './schemas/transaction.schema';
import { TransactionHistoryService } from './transaction-history.service';
import GetTransactionHistoryDto from './dto/get-transaction-history.dto';

@Controller('transaction-history')
export class TransactionHistoryController {
  constructor(
    private readonly transactionHistoryService: TransactionHistoryService,
  ) {}

  @Get()
  getTransactionHistory(
    @Query() getTransactionHistoryDto: GetTransactionHistoryDto,
  ): Promise<Transaction[]> {
    const defaultParams = { currency: 'USD', page: '1', limit: '2' };
    for (const param in defaultParams) {
      if (!getTransactionHistoryDto.hasOwnProperty(param))
        getTransactionHistoryDto[param] = defaultParams[param];
    }
    return this.transactionHistoryService.getTransactionsByParams(
      getTransactionHistoryDto.currency,
      getTransactionHistoryDto.page,
      getTransactionHistoryDto.limit,
    );
  }
}
