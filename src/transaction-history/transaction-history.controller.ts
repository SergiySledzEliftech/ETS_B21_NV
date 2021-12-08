import { Controller, Get, Query, UseGuards, Request } from '@nestjs/common';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
import { TransactionHistoryService } from './transaction-history.service';
import GetTransactionHistoryDto from './dto/get-transaction-history.dto';
import ReturnTransactionHistoryDto from './dto/return-transaction-history.dto';

@Controller('transaction-history')
export class TransactionHistoryController {
  constructor(
    private readonly transactionHistoryService: TransactionHistoryService,
  ) {}

  @Get()
  @UseGuards(JwtAuthGuard)
  async getTransactionHistory(
    @Request() { user },
    @Query() getTransactionHistoryDto: GetTransactionHistoryDto,
  ): Promise<ReturnTransactionHistoryDto> {
    const userId = user.user._id.toString();
    console.log(userId);
    const { limit = '10', page = '1' } = getTransactionHistoryDto;
    const limitNum = +limit;
    const pageNum = +page;

    const documentToFind = this.transactionHistoryService.createDocumentToFind(
      getTransactionHistoryDto,
      userId,
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
