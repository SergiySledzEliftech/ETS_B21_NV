import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Transaction, TransactionDocument } from './schemas/transaction.schema';

@Injectable()
export class TransactionHistoryService {
  constructor(
    @InjectModel('Transaction')
    private transactionModel: Model<TransactionDocument>,
  ) {}

  async getTransactionsByParams(
    currency: string,
    page: string,
    limit: string,
  ): Promise<Transaction[]> {
    const pageNum = +page;
    const limitNum = +limit;

    const transactions = await this.transactionModel
      .find({ currencyName: currency })
      .limit(limitNum)
      .skip((pageNum - 1) * limitNum)
      .exec();
    return transactions;
  }
}
