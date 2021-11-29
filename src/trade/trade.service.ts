import { Injectable } from '@nestjs/common';

import { HttpService } from '@nestjs/axios';
import { Observable, map, forkJoin, mergeMap } from 'rxjs';

import { UpdateDataForBuyingDto } from './dto/update-data-for-buying.dto'
import { BuyCurrencyDto } from './dto/buy-currency.dto';

const SERVER = 'http://localhost:4000';

const RATE = '/globalCurrencies';
const USERS = '/users';
const USER_CURRENCIES = '/userCurrencies';

const BALANCE = '/balance';
const TRANSACTIONS = '/transactions';

@Injectable()
export class TradeService {
  constructor(
    private readonly httpService: HttpService
  ) {}

  buyCurrency(dto: BuyCurrencyDto): Observable<Array<any>> {
    const currentDate = new Date();
    const { currencyName, userId, spent } = dto;

    return this
      .getDataForBuying(currencyName, spent, userId)
      .pipe(mergeMap(values => {
        const [ rate, amount, balance, currency ] = values;
        console.log(rate, amount, balance, currency);
        if (balance < spent) {
          return this.httpService
            .get(SERVER + USER_CURRENCIES + '/all', {
              params: {
                userId,
              }
          }).pipe(map(response => response.data));
        }
        return this
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
      return this.httpService
        .get(SERVER + USER_CURRENCIES + '/all', {
        params: {
          userId,
        }
      }).pipe(map(response => response.data));
    }));
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
      .get(SERVER + USERS + BALANCE + '/' + userId)
      .pipe(map(response => response.data));

    const currencyObservable = this.httpService
      .get(SERVER + USER_CURRENCIES, {
        params: {
          userId,
          name: currencyName,
        }
      })
      .pipe(map(response => response.data));
    
    return forkJoin([
      rateObservable,
      amountObservable,
      balanceObservable,
      currencyObservable
    ]);
  }

  getNewCurrencyObservable() {}

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
      .put(SERVER + USERS + BALANCE + '/' + userId, {
      dollarBalance: -spent,
    })
      .pipe(map(response => response.data));

    const transactionObservable = this.httpService
      .post(SERVER + TRANSACTIONS, {
      amount,
      date: currentDate,
      rate,
      spent,
    })
      .pipe(map(response => response.data));
    
    let currencyObservable;
    if (!currency) {
      currencyObservable = this.httpService
        .post(SERVER + USER_CURRENCIES, {
        userId,
        name: currencyName,
        startedAt: currentDate,
        updatedAt: currentDate,
        amount,
      })
      .pipe(map(response => response.data));
    } else {
      const newAmount = currency.amount + amount;
      currencyObservable = this.httpService
        .patch(SERVER + USER_CURRENCIES, {
        amount: newAmount,
        updatedAt: currentDate,
        userId,
        name: currencyName,
      })
      .pipe(map(response => response.data));
    }
    return forkJoin([
      currencyObservable,
      transactionObservable,
      balanceUpdateObservable
    ]);
  }
}