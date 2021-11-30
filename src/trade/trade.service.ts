import { Injectable } from '@nestjs/common';

import { HttpService } from '@nestjs/axios';
import { Observable, map, forkJoin, mergeMap, of } from 'rxjs';

import { BuyCurrencyDto } from './dto/buy-currency.dto';
import { SellCurrencyDto } from './dto/sell-currency.dto';
import { UpdateDataForBuyingDto } from './dto/update-data-for-buying.dto'
import { getNewCurrencyObservableDto } from './dto/get-new-currency-observable.dto';
import { getUpdateCurrencyObservableDto } from './dto/get-update-currency-observable.dto';

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

  buyCurrency(dto: BuyCurrencyDto): Observable<any> {
    const currentDate = new Date();
    const { currencyName, userId, spent } = dto;

    return this
      .getDataForBuying(currencyName, spent, userId)
      .pipe(mergeMap(values => {
        const [ rate, amount, balance, currency ] = values;
        console.log(rate, amount, balance, currency);
        if (balance < spent) {
          return of('Error: not enough balance');
        }
        const currencyObservable = currency ? 
          this.getUpdateCurrencyObservable({
            userId,
            name: currencyName,
            updatedAt: currentDate,
            amount: currency.amount + amount
          }) :
          this.getNewCurrencyObservable({
            userId,
            name: currencyName,
            updatedAt: currentDate,
            startedAt: currentDate,
            amount
          });
        const updateObservables = [...this
        .updateDataForBuying({
          userId,
          currencyName,
          spent,
          rate,
          amount,
          currency,
          currentDate,
        }), currencyObservable];
        return forkJoin(updateObservables);
      },
    )).pipe(mergeMap(result => {
      if (typeof result === 'string') return of({ result });
      return of({ result: 'success' });
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

  getNewCurrencyObservable(dto: getNewCurrencyObservableDto): Observable<any> {
    return this.httpService
      .post(SERVER + USER_CURRENCIES, dto)
      .pipe(map(response => response.data));
  }

  getUpdateCurrencyObservable(dto: getUpdateCurrencyObservableDto): Observable<any> {
    return this.httpService
      .patch(SERVER + USER_CURRENCIES, dto)
      .pipe(map(response => response.data));
  }

  updateDataForBuying(dto: UpdateDataForBuyingDto): Array<Observable<any>> {
    const {
      userId,
      amount,
      currentDate,
      rate,
      spent,
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
    return [
      transactionObservable,
      balanceUpdateObservable
    ];
  }
}