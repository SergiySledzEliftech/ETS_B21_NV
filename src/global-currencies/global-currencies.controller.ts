import { Controller, Get, Query, UseGuards } from '@nestjs/common';
import { GlobalCurrenciesService } from './global-currencies.service';
import { AxiosResponse } from 'axios';
import { Observable, map } from 'rxjs';

import { ConvertCurrencyDto } from './dto/convert-currency.dto';
import { CurrencyChangesDto } from './dto/currency-changes.dto';
import { GetRateByDate } from './dto/get-rate-by-date.dto';
import { query } from 'express';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
import { ApiSecurity } from '@nestjs/swagger';

const BASE = 'USD';
const SOURCE = 'crypto';

@Controller('globalCurrencies')
export class GlobalCurrenciesController {
  constructor (private readonly globalCurrenciesService: GlobalCurrenciesService) {}

  @ApiSecurity('bearerAuth')
  @Get('latest')
  getRates(): Observable<AxiosResponse<any>> {
    console.log('latest');
    return this.globalCurrenciesService
      .getRates(BASE, SOURCE)
      .pipe(map(res => res.data.rates));
  }

  @ApiSecurity('bearerAuth')
  @Get('latest/one')
  getRate(@Query('currencyName') currencyName: string): Observable<AxiosResponse<any>> {
    console.log('getting rate one');
    
    return this.globalCurrenciesService
      .getRate(BASE, SOURCE, currencyName)
      .pipe(map(res => res.data));
  }

  @ApiSecurity('bearerAuth')
  @Get('history')
  getHistory(@Query() query: GetRateByDate): Observable<AxiosResponse<any>> {
    const { date, currency } = query;
    return this.globalCurrenciesService
      .getHistory(date, BASE, currency, SOURCE)
      .pipe(map(res => res.data.rates));
  }

  @ApiSecurity('bearerAuth')
  @Get('convert')
  convert(@Query() query: ConvertCurrencyDto) {
    const { to, amount } = query;
    console.log('converting:', to, amount);
    return this.globalCurrenciesService
      .convertCurrency(BASE, to, amount, SOURCE)
      .pipe(map(res => res.data));
  }

  @UseGuards(JwtAuthGuard)
  @ApiSecurity('bearerAuth')
  @Get('changes')
  getChanges(@Query('start_date') startDate: string, @Query('end_date') endDate: string) {
    try {
      const result = this.globalCurrenciesService.getChanges(BASE, SOURCE, startDate, endDate)
      .pipe(map(res => {
          let arr: Array<[String, CurrencyChangesDto]>
          arr = Object.entries(res.data.rates)
          return arr.map(([currName, {start_rate, end_rate}]): [String, CurrencyChangesDto] => {
            let startUSDbased = !!start_rate ? Math.round(1 / start_rate * 10000) / 10000 : 0
            let endUSDbased = !!end_rate ? Math.round(1 / end_rate * 10000) / 10000 : 0
            let changeUSDbased = Math.round((endUSDbased - startUSDbased) * 10000) / 10000
            let change_pctUSDbased = Math.round((changeUSDbased / startUSDbased) * 100) / 100
            
            let ratesObj: CurrencyChangesDto = {
              "start_rate": startUSDbased,
              "end_rate": endUSDbased,
              "change": changeUSDbased,
              "change_pct": change_pctUSDbased
            }
            return [currName, ratesObj]
          }).filter(([, { end_rate, start_rate, change }]) => !!end_rate && !!start_rate && !!change)
        })       
      )
      return result
    } catch (error) {
      return error
    }
  }

  @UseGuards(JwtAuthGuard)
  @ApiSecurity('bearerAuth')
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
