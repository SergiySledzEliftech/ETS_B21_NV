import { Controller, Get, Query } from '@nestjs/common';
import TransactionInterface from './interfaces/transaction.interface';
import { TransactionHistoryService } from './transaction-history.service';
import GetTransactionHistoryDto from './dto/get-transaction-history.dto';

@Controller('transaction-history')
export class TransactionHistoryController {
  constructor(
    private readonly transactionHistoryService: TransactionHistoryService,
  ) {}

  @Get('numderOfTransactions')
  getNumberOfTransactions() {
    
  }

  @Get()
  async getTransactionHistory(
    @Query() getTransactionHistoryDto: GetTransactionHistoryDto,
  ): Promise<TransactionInterface[]> {
    const defaultParams = { currency: 'USD', page: '1', limit: '2' };
    for (const param in defaultParams) {
      if (!getTransactionHistoryDto.hasOwnProperty(param))
        getTransactionHistoryDto[param] = defaultParams[param];
    }
    const data = await this.transactionHistoryService.getPaginatedTransactions(
      getTransactionHistoryDto.currency,
      getTransactionHistoryDto.page,
      getTransactionHistoryDto.limit,
    );
    return data;
  }
}
