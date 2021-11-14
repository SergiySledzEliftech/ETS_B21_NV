import { Controller, Get, Query } from '@nestjs/common';
import { GlobalCurrenciesService } from './global-currencies.service';
import { AxiosResponse } from 'axios';
import { Observable, map } from 'rxjs';

import { ConvertCurrencyDto } from './dto/convert-currency.dto';

const BASE = 'USD';

@Controller('globalCurrencies')
export class GlobalCurrenciesController {
  constructor (private readonly globalCurrenciesService: GlobalCurrenciesService) {}

  @Get('latest')
  getRates(): Observable<AxiosResponse<any>> {
    return this.globalCurrenciesService
      .getRates(BASE)
      .pipe(map(res => res.data.rates));
  }

  @Get('history')
  getHistory(@Query('date') date: string): Observable<AxiosResponse<any>> {
    return this.globalCurrenciesService
      .getHistory(date, BASE)
      .pipe(map(res => res.data.rates));
  }

  @Get('convert')
  convert(@Query() query: ConvertCurrencyDto) {
    const { to, amount } = query;
    return this.globalCurrenciesService
      .convertCurrency(BASE, to, amount)
      .pipe(map(res => res.data));
  }

}
