import { Controller, Get, Query } from '@nestjs/common';
import TransactionInterface from './interfaces/transaction.interface';
import { TransactionHistoryService } from './transaction-history.service';
import GetTransactionHistoryDto from './dto/get-transaction-history.dto';

@Controller('transaction-history')
export class TransactionHistoryController {
  constructor(
    private readonly transactionHistoryService: TransactionHistoryService,
  ) {}

  @Get()
  async getTransactionHistory(
    @Query() getTransactionHistoryDto: GetTransactionHistoryDto,
  ): Promise<[TransactionInterface[], number]> {
    const {
      currency = 'USD',
      page = '1',
      limit = '2',
    } = getTransactionHistoryDto;

    const numberOfPages = await this.transactionHistoryService.getNumberOfPages(
      currency,
      limit,
    );

    const transactions =
      await this.transactionHistoryService.getPaginatedTransactions(
        currency,
        page,
        limit,
      );
    return [transactions, numberOfPages];
  }
}
