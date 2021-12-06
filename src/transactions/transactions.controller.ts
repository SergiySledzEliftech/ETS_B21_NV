import {
  Body,
  Controller,
  Get,
  Delete,
  Post,
  Query,
} from '@nestjs/common';
import { GetTransactionsDto } from './dto/get-transactions.dto';
import { CreateTransactionDto } from './dto/create-transaction.dto';
import { DeleteTransactionById } from './dto/delete-transaction-by-id.dto';
import { Transaction, TransactionDocument } from './schemas/transaction.schema';
import { TransactionsService } from './transactions.service';

@Controller('transactions')
export class TransactionsController {
  constructor(private readonly transactionsService: TransactionsService) {
  }
  @Get()
  getAllTransactionsByName(@Query() query: GetTransactionsDto): Promise<Transaction[]> {
    const { userId, currencyName } = query;
    if (userId && currencyName) {
      return this.transactionsService
        .getAllTransactionsByNameAndUserId(currencyName, userId);
    }
    if (userId) {
      return this.transactionsService
        .getAllTransactionsByUserId(userId);
    }
    if (currencyName) {
      return this.transactionsService
        .getAllTransactionsByName(currencyName);
    }
  }

  @Post()
  createTransaction(@Body() query: CreateTransactionDto): Promise<Transaction> {
    return this.transactionsService.createTransaction(query);
  }

  @Delete()
  deleteTransactionById(@Body() body: DeleteTransactionById): Promise<Transaction> {
    return this.transactionsService.deleteTransactionById(body.id);
  }
}
