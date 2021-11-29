import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Transaction, TransactionDocument } from './schemas/transaction.schema';

import { CreateTransactionDto } from './dto/create-transaction.dto';

@Injectable()
export class TransactionsService {
  constructor(
    @InjectModel(Transaction.name) private transactionModel: Model<TransactionDocument>
  ) {}
  async getAllTransactionsByUserId(userId: string): Promise<Transaction[]> {
    return this.transactionModel.find({ userId });
  }

  async getAllTransactionsByName(currencyName: string): Promise<Transaction[]> {
    return this.transactionModel.find({ currencyName });
  }

  async getAllTransactionsByNameAndUserId(
    currencyName: string,
    userId: string
  ): Promise<Transaction[]> {
    return this.transactionModel.find({ currencyName, userId });
  }

  async createTransaction(transactionDto: CreateTransactionDto): Promise<Transaction> {
    const newUserTransaction = new this.transactionModel(transactionDto);
    return newUserTransaction.save();
  }
}