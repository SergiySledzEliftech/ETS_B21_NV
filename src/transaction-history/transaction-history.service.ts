import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import TransactionInterface from './interfaces/transaction.interface';
import { TransactionDocument } from '../user-currencies/schemas/transaction.schema';

@Injectable()
export class TransactionHistoryService {
  constructor(
    @InjectModel('Transaction')
    private transactionModel: Model<TransactionDocument>,
  ) {}

  async getNumberOfPages(currency: string, limit: string): Promise<number> {
    const limitNum = +limit;
    const numberOfDocuments = await this.transactionModel.countDocuments({
      currencyName: currency,
    });
    const pages = Math.ceil(numberOfDocuments / limitNum);
    return pages;
  }

  async getPaginatedTransactions(
    currency: string,
    page: string,
    limit: string,
  ): Promise<TransactionInterface[]> {
    const pageNum = +page;
    const limitNum = +limit;

    const transactions = await this.transactionModel
      .find({ currencyName: currency })
      .limit(limitNum)
      .skip((pageNum - 1) * limitNum)
      .select('-_id -userId -__v')
      .exec();

    return transactions;
  }
}
