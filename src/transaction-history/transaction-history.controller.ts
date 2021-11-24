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
    const { limit, page } = getTransactionHistoryDto;
    const limitNum = +limit;
    const pageNum = +page;

    const documentToFind = this.transactionHistoryService.createDocumentToFind(
      getTransactionHistoryDto,
    );

    const numberOfPages = await this.transactionHistoryService.getNumberOfPages(
      documentToFind,
      limitNum,
    );

    const transactions =
      await this.transactionHistoryService.getPaginatedTransactions(
        documentToFind,
        limitNum,
        pageNum,
      );
    return { data: transactions, numberOfPages, currentPage: page };
  }
}
