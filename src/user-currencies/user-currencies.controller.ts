import {
  Controller,
  Get,
  Patch,
  Post,
  Query,
} from '@nestjs/common';
import { UserCurrenciesService } from './user-currencies.service'
import { Currency } from './schemas/currency.schema';
import { Transaction } from './schemas/transaction.schema';

import { Observable, from, mergeMap } from 'rxjs';

import { GetCurrencyDto } from './dto/get-currency.dto';
import { UserCurrencyDto } from './dto/user-currency.dto';
import { UpdateCurrencyDto } from './dto/update-currency.dto';
import { GetTransactionsDto } from './dto/get-transactions.dto';
import { BuyCurrencyDto } from './dto/buy-currency.dto';
import { CreateTransactionDto } from './dto/create-transaction.dto';

const SERVER = 'http://localhost:4000';
const USERS_BALANCE = '/users/balance';

@Controller('userCurrencies')
export class UserCurrenciesController {
  constructor(private readonly userCurrenciesService: UserCurrenciesService) {
  }

  @Get('currencies')
  getCurrency(@Query() query: GetCurrencyDto): Promise<Currency> {
    const { userId, name } = query;
    return this.userCurrenciesService.getOneCurrency(userId, name);
  }

  @Get('currencies/all')
  gelAllCurrencies(@Query('userId') userId: string): Promise<Currency[]> {
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

  @Post('buy')
  buyCurrency(@Query() query: BuyCurrencyDto): Observable<any> {
    const currentDate = new Date();
    const { currencyName, userId, spent } = query;

    return this.userCurrenciesService
      .getDataForBuying(currencyName, spent, userId)
      .pipe(mergeMap(values => {
        const [ rate, amount, balance, currency ] = values;
        console.log(rate, amount, balance, currency);
        if (balance < spent) {
          return this.userCurrenciesService
            .getAllCurrenciesByUserId(userId);
        }
        return this.userCurrenciesService
          .updateDataForBuying({
            userId,
            currencyName,
            spent,
            rate,
            amount,
            currency,
            currentDate,
          });
      },
    )).pipe(mergeMap(values => {
      console.log(values);
      return from(this.userCurrenciesService.getAllCurrenciesByUserId(userId));
    }));
  }

}