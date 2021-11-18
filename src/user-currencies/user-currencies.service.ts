import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Currency, CurrencyDocument } from './schemas/currency.schema';
import { Transaction, TransactionDocument } from './schemas/transaction.schema';

import { UserCurrencyDto } from './dto/user-currency.dto';
import { UpdateCurrencyDto } from './dto/update-currency.dto';
import { CreateTransactionDto } from './dto/create-transaction.dto';

@Injectable()
export class UserCurrenciesService {
  constructor(
    @InjectModel(Currency.name) private currencyModel: Model<CurrencyDocument>,
    @InjectModel(Transaction.name) private transactionModel: Model<TransactionDocument>
  ) {}

  // currencies methods

  async getAllCurrenciesByUserId(userId: number): Promise<Currency[]> {
    return this.currencyModel.find({ userId });
  }

  async getAllCurrenciesByName(name: string): Promise<Currency[]> {
    return this.currencyModel.find({ name });
  }

  async getOneCurrency(userId: number, name: string): Promise<Currency> {
    return this.currencyModel.findOne({ name, userId });
  }

  async createCurrency(currencyDto: UserCurrencyDto): Promise<Currency> {
    const newUserCurrency = new this.currencyModel(currencyDto);
    return newUserCurrency.save();
  }

  async removeCurrency(userId: number, name: string): Promise<Currency> {
    return this.currencyModel.findOneAndRemove({ name, userId });
  }

  async updateCurrency(updateDto: UpdateCurrencyDto): Promise<Currency> {
    const { userId, amount, name, updatedAt } = updateDto;
    return this.currencyModel.findOneAndUpdate({ userId, name }, { amount, updatedAt });
  }

  // transactions methods

  async getAllTransactionsByUserId(userId: number): Promise<Transaction[]> {
    return this.transactionModel.find({ userId });
  }

  async getAllTransactionsByName(currencyName: string): Promise<Transaction[]> {
    return this.transactionModel.find({ currencyName });
  }

  async getAllTransactionsByNameAndUserId(currencyName: string, userId: number): Promise<Transaction[]> {
    return this.transactionModel.find({ currencyName, userId });
  }

  async createTransaction(transactionDto: CreateTransactionDto): Promise<Transaction> {
    const newUserTransaction = new this.transactionModel(transactionDto);
    return newUserTransaction.save();
  }
}
