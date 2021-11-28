import { Controller, Get, Query } from '@nestjs/common';
import { GlobalCurrenciesService } from './global-currencies.service';
import { AxiosResponse } from 'axios';
import { Observable, map } from 'rxjs';

import { ConvertCurrencyDto } from './dto/convert-currency.dto';
import { CurrencyChangesDto } from './dto/currency-changes.dto';

const BASE = 'USD';
const SOURCE = 'crypto';

@Controller('globalCurrencies')
export class GlobalCurrenciesController {
  constructor (private readonly globalCurrenciesService: GlobalCurrenciesService) {}

  @Get('latest')
  getRates(): Observable<AxiosResponse<any>> {
    console.log('latest');
    return this.globalCurrenciesService
      .getRates(BASE, SOURCE)
      .pipe(map(res => res.data.rates));
  }

  @Get('latest/one')
  getRate(@Query('currencyName') currencyName: string): Observable<AxiosResponse<any>> {
    console.log('getting rate one');
    
    return this.globalCurrenciesService
      .getRate(BASE, SOURCE, currencyName)
      .pipe(map(res => res.data));
  }

  @Get('history')
  getHistory(@Query('date') date: string): Observable<AxiosResponse<any>> {
    return this.globalCurrenciesService
      .getHistory(date, BASE, SOURCE)
      .pipe(map(res => res.data.rates));
  }

  @Get('convert')
  convert(@Query() query: ConvertCurrencyDto) {
    const { to, amount } = query;
    console.log('converting:', to, amount);
    return this.globalCurrenciesService
      .convertCurrency(BASE, to, amount, SOURCE)
      .pipe(map(res => res.data));
  }

  @Get('changes')
  getChanges(@Query('start_date') startDate: string, @Query('end_date') endDate: string) {
    try {
      const result = this.globalCurrenciesService.getChanges(BASE, SOURCE, startDate, endDate).pipe(
        map(res => {
          let arr: Array<[String, CurrencyChangesDto]>
          arr = Object.entries(res.data.rates)
          return arr.map(([currName, {start_rate, end_rate}]): [String, CurrencyChangesDto] => {
            let startUSDbased = 1 / start_rate
            let endUSDbased = 1 / end_rate
            let changeUSDbased = endUSDbased - startUSDbased
            let change_pctUSDbased = Math.round((changeUSDbased / startUSDbased) * 10000) / 100
            
            let ratesObj: CurrencyChangesDto = {
              "start_rate": startUSDbased,
              "end_rate": endUSDbased,
              "change": changeUSDbased,
              "change_pct": change_pctUSDbased
            }
            return [currName, ratesObj]
          }).filter(([_, { end_rate, change }]) => isFinite(end_rate) && isFinite(change))
        })       
      )
      return result
    } catch (error) {
      return error
    }
  }

  @Get('period')
  getPeriodRates(@Query('start_date') startDate: string, @Query('end_date') endDate: string) {
    try {
      const result = this.globalCurrenciesService.getPeriodRates(BASE, SOURCE, startDate, endDate).pipe(
        map(res => {
          const arr = Object.entries(res.data.rates)
          
          return arr.map(([date, currencies]): [String, [String, Number][]] => {
            let labels = Object.keys(currencies)
            
            return [date, labels.map(label => [label, 1 / currencies[label]])]
          })
        })       
      )
      return result  
    } catch (error) {
      return error
    }
  }

}
