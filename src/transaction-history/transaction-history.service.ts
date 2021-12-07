import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import TransactionInterface from './interfaces/transaction.interface';
import { TransactionDocument } from '../transactions/schemas/transaction.schema'
import DocumentToFind from './interfaces/documentToFind.interface';
import GetTransactionHistoryDto from './dto/get-transaction-history.dto';

@Injectable()
export class TransactionHistoryService {
  constructor(
    @InjectModel('Transaction')
    private transactionModel: Model<TransactionDocument>,
  ) {}

  createDocumentToFind(
    getTransactionHistoryDto: GetTransactionHistoryDto,
  ): DocumentToFind {
    const { currency = 'ALL', userId, dateRange } = getTransactionHistoryDto;

    const documentToFind: DocumentToFind = {};
    if (currency !== 'ALL') documentToFind.currencyName = currency;
    else documentToFind.currencyName = new RegExp('.*');
    if (userId) documentToFind.userId = userId;
    if (dateRange) {
      documentToFind.date = {
        $gte: dateRange.split('#')[0],
        $lt: dateRange.split('#')[1],
      };
    }
    return documentToFind;
  }

  async getNumberOfPages(
    documentToFind: DocumentToFind,
    limitNum: number,
  ): Promise<number> {
    const numberOfDocuments = await this.transactionModel.countDocuments(
      documentToFind,
    );
    const pages = Math.ceil(numberOfDocuments / limitNum);
    return pages;
  }

  async getPaginatedTransactions(
    documentToFind: DocumentToFind,
    limitNum: number,
    pageNum: number,
  ): Promise<TransactionInterface[]> {
    const transactions = await this.transactionModel
      .find(documentToFind)
      .sort('-date')
      .limit(limitNum)
      .skip((pageNum - 1) * limitNum)
      .select('-_id -userId -__v')
      .exec();
    return transactions;
  }
}
