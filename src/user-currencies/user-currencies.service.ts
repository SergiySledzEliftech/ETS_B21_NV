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

  getDataForBuying(
    currencyName: string,
    spent: number,
    userId: string
  ): Observable<Array<any>> {
    const rateObservable = this.httpService
      .get(SERVER + RATE + '/latest/one', {
      params: {
        currencyName,
      }
    })
      .pipe(map(response => response.data.rates[currencyName]));
    
    const amountObservable = this.httpService
      .get(SERVER + RATE + '/convert', {
      params: {
        to: currencyName,
        amount: spent,
      }
    })
      .pipe(map(response => response.data.result));
    
    const balanceObservable = this.httpService
      .get(SERVER + USERS + '/balance/' + userId)
      .pipe(map(response => response.data));

    const currencyObservable = from(this
      .getOneCurrency(userId, currencyName));
    
    return forkJoin([
      rateObservable,
      amountObservable,
      balanceObservable,
      currencyObservable
    ]);
  }

  updateDataForBuying(dto: UpdateDataForBuyingDto): Observable<Array<any>> {
    const {
      userId,
      currencyName,
      amount,
      currentDate,
      rate,
      spent,
      currency,
    } = dto;
    console.log(spent);
    const balanceUpdateObservable = this.httpService
      .put(SERVER + USERS + '/balance/' + userId, {
      dollarBalance: -spent,
    })
      .pipe(map(response => response.data));

    const transactionObservable = from(this
      .createTransaction({
        userId,
        currencyName,
        amount,
        date: currentDate,
        rate,
        spent,
    }));
    
    let currencyObservable;
    if (!currency) {
      currencyObservable = from(this.createCurrency({
        userId,
        name: currencyName,
        startedAt: currentDate,
        updatedAt: currentDate,
        amount,
      }));
    } else {
      const newAmount = currency.amount + amount;
      currencyObservable = from(this.updateCurrency({
        amount: newAmount,
        updatedAt: currentDate,
        userId,
        name: currencyName,
      }));
    }
    return forkJoin(currencyObservable, transactionObservable, balanceUpdateObservable);
  }
}
