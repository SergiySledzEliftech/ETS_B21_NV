import { Body, Controller, Delete, Get, Injectable, Patch, Post, Query } from '@nestjs/common';
import { UserCurrenciesService } from './user-currencies.service'
import { Currency } from './schemas/currency.schema';
import { Transaction } from './schemas/transaction.schema';

import { HttpService } from '@nestjs/axios';
import { AxiosResponse } from 'axios';
import { Observable, map } from 'rxjs';

import { GetCurrencyDto } from './dto/get-currency.dto';
import { UserCurrencyDto } from './dto/user-currency.dto';
import { UpdateCurrencyDto } from './dto/update-currency.dto';
import { GetTransactionsDto } from './dto/get-transactions.dto';
import { BuyCurrencyDto } from './dto/buy-currency.dto';
import { CreateTransactionDto } from './dto/create-transaction.dto';

const SERVER_RATE = 'localhost:4000/globalCurrencies';
let userBalance = 100000;

@Controller('userCurrencies')
export class UserCurrenciesController {
  constructor(
    private readonly userCurrenciesService: UserCurrenciesService,
    private readonly httpService: HttpService
  ) {
  }

  @Get('currencies')
  getCurrency(@Query() query: GetCurrencyDto): Promise<Currency> {
    const { userId, name } = query;
    return this.userCurrenciesService.getOneCurrency(userId, name);
  }

  @Get('currencies/all')
  gelAllCurrencies(userId: number): Promise<Currency[]> {
    return this.userCurrenciesService.getAllCurrenciesByUserId(userId);
  }

  @Post('currencies')
  createNewCurrency(@Query() query: UserCurrencyDto): Promise<Currency> {
    return this.userCurrenciesService.createCurrency(query);
  }

  @Patch('currencies')
  updateCurrency(@Query() query: UpdateCurrencyDto): Promise<Currency> {
    return this.userCurrenciesService.updateCurrency(query);
  }

  @Get('transactions')
  getAllTransactionsByName(@Query() query: GetTransactionsDto): Promise<Transaction[]> {
    const { userId, currencyName } = query;
    if (userId && currencyName) {
      return this.userCurrenciesService
        .getAllTransactionsByNameAndUserId(currencyName, userId);
    }
    if (userId) {
      return this.userCurrenciesService
        .getAllTransactionsByUserId(userId);
    }
    if (currencyName) {
      return this.userCurrenciesService
        .getAllTransactionsByName(currencyName);
    }
  }

  @Post('transactions')
  createTransaction(@Query() query: CreateTransactionDto): Promise<Transaction> {
    return this.userCurrenciesService.createTransaction(query);
  }

  // @Post('buy')
  // buyCurrency(@Query() query: BuyCurrencyDto): Promise<Currency[]> {
  //   const currentDate = new Date();
  //   const { currencyName, expectedCurrencyAmount, userId, spent } = query;
  //   const ratePromise = this.httpService.get(SERVER_RATE + 'latest/one', {
  //     params: {
  //       currencyName,
  //     }
  //   });
  //   const realAmountPromise = this.httpService.get(SERVER_RATE + 'convert', {
  //     params: {
  //       to: currencyName,
  //       amount: spent,
  //     }
  //   });
  //   const userCurrencyPromise = this.userCurrenciesService
  //     .getOneCurrency(userId, currencyName);
  //   Promise.all([ratePromise, realAmountPromise, userCurrencyPromise]).then(values => {
  //     const [ rate, realAmount, userCurrency ] = values;
  //     if (userBalance < spent) {
  //       return this.userCurrenciesService.getAllCurrenciesByUserId(userId);
  //     }
  //     this.userCurrenciesService.createTransaction({
  //       userId,
  //       currencyName,
  //       amount: realAmount,
  //       date: currentDate,
  //       rate,
  //       spent,
  //     });
  //     if (userCurrency) {
  //       const newAmount = userCurrency.amount + realAmount;
  //     }
  //   }).then()
  // }

}