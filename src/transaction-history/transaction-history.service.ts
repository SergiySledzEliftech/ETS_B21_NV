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

  async getNumberOfPages(
    currency: string,
    limit: string,
    userId: string,
  ): Promise<number> {
    const limitNum = +limit;
    const documentToFind = {};
    if (currency !== 'ALL') documentToFind['currencyName'] = currency;
    if (userId) documentToFind['userId'] = userId;
    const numberOfDocuments = await this.transactionModel.countDocuments(
      documentToFind,
    );
    const pages = Math.ceil(numberOfDocuments / limitNum);
    return pages;
  }

  async getPaginatedTransactions(
    currency: string,
    page: string,
    limit: string,
    userId: string,
  ): Promise<TransactionInterface[]> {
    const pageNum = +page;
    const limitNum = +limit;

    const documentToFind = {};
    if (currency !== 'ALL') documentToFind['currencyName'] = currency;
    if (userId) documentToFind['userId'] = userId;
    const transactions = await this.transactionModel
      .find(documentToFind)
      .limit(limitNum)
      .skip((pageNum - 1) * limitNum)
      .select('-_id -userId -__v')
      .exec();

    return transactions;
  }
}
