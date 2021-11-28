import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Currency, CurrencyDocument } from './schemas/currency.schema';
import { Transaction, TransactionDocument } from './schemas/transaction.schema';

import { HttpService } from '@nestjs/axios';
import { AxiosResponse } from 'axios';
import { Observable, map, forkJoin, from } from 'rxjs';

import { UserCurrencyDto } from './dto/user-currency.dto';
import { UpdateCurrencyDto } from './dto/update-currency.dto';
import { CreateTransactionDto } from './dto/create-transaction.dto';
import { UpdateDataForBuyingDto } from './dto/update-data-for-buying.dto';

const SERVER = 'http://localhost:4000';
const RATE = '/globalCurrencies';
const USERS = '/users';

@Injectable()
export class UserCurrenciesService {
  constructor(
    @InjectModel(Currency.name) private currencyModel: Model<CurrencyDocument>,
    @InjectModel(Transaction.name) private transactionModel: Model<TransactionDocument>,
    private readonly httpService: HttpService
  ) {}

  // currencies methods

  async getAllCurrenciesByUserId(userId: string): Promise<Currency[]> {
    return this.currencyModel.find({ userId });
  }

  async getAllCurrenciesByName(name: string): Promise<Currency[]> {
    return this.currencyModel.find({ name });
  }

  async getOneCurrency(
    userId: string,
    name: string
  ): Promise<Currency> {
    return this.currencyModel.findOne({ name, userId });
  }

  async createCurrency(currencyDto: UserCurrencyDto): Promise<Currency> {
    const newUserCurrency = new this.currencyModel(currencyDto);
    return newUserCurrency.save();
  }

  async removeCurrency(
    userId: string, 
    name: string
  ): Promise<Currency> {
    return this.currencyModel.findOneAndRemove({ name, userId });
  }

  async updateCurrency(updateDto: UpdateCurrencyDto): Promise<Currency> {
    const { userId, amount, name, updatedAt } = updateDto;
    return this.currencyModel
      .findOneAndUpdate({ userId, name }, { amount, updatedAt });
  }
  
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
