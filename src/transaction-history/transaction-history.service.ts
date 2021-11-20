import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import TransactionInterface from './interfaces/transaction.interface';
import { Transaction, TransactionDocument } from './schemas/transaction.schema';

@Injectable()
export class TransactionHistoryService {
  constructor(
    @InjectModel('Transaction')
    private transactionModel: Model<TransactionDocument>,
  ) {}

  async getTransactionsFromDatabase(
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

  async getTransactionsByParams(
    currency: string,
    page: string,
    limit: string,
  ): Promise<TransactionInterface[]> {
    const transactions = await this.getTransactionsFromDatabase(
      currency,
      page,
      limit,
    );
    const neededFieldstransactions = [];
    transactions.forEach((transaction) => {
      const currencyName = transaction.currencyName;
      const amount = transaction.amount;
      const date = transaction.date;
      neededFieldstransactions.push({ currencyName, amount, date });
    });
    console.log('transactions', neededFieldstransactions);
    return neededFieldstransactions;
  }
}
