import { Controller, Get, Query } from '@nestjs/common';
import { TransactionHistoryService } from './transaction-history.service';
import GetTransactionHistoryDto from './dto/get-transaction-history.dto';
import ReturnTransactionHistoryDto from './dto/return-transaction-history.dto';

@Controller('transaction-history')
export class TransactionHistoryController {
  constructor(
    private readonly transactionHistoryService: TransactionHistoryService,
  ) {}

  @Get()
  async getTransactionHistory(
    @Query() getTransactionHistoryDto: GetTransactionHistoryDto,
  ): Promise<ReturnTransactionHistoryDto> {
    const {
      currency = 'ALL',
      page = '1',
      limit = '2',
      userId,
    } = getTransactionHistoryDto;

    const numberOfPages = await this.transactionHistoryService.getNumberOfPages(
      currency,
      limit,
      userId,
    );

    const transactions =
      await this.transactionHistoryService.getPaginatedTransactions(
        currency,
        page,
        limit,
        userId,
      );
    return { data: transactions, numberOfPages, currentPage: page };
  }
}
