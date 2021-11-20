import { Injectable } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { AxiosResponse } from 'axios';
import { Observable } from 'rxjs';

const EXCHANGERATE_API = 'https://api.exchangerate.host/';

@Injectable()
export class GlobalCurrenciesService {
  constructor(private readonly httpService: HttpService) {}

  getRates(
      base: string,
      source: string
    ): Observable<AxiosResponse<any>> {
    return this.httpService.get(EXCHANGERATE_API + 'latest', {
      params: {
        base,
        source,
      }
    });
  }

  getRate(
    base: string,
    source: string,
    symbols: string
  ): Observable<AxiosResponse<any>> {
    return this.httpService.get(EXCHANGERATE_API + 'latest', {
      params: {
        base,
        source,
        symbols
      }
    });
  }

  getHistory(
    date: string,
    base: string,
    source: string
  ): Observable<AxiosResponse<any>> {
    return this.httpService.get(EXCHANGERATE_API + date, {
      params: {
        base,
        source,
      }
    });
  }

  convertCurrency(
    from: string,
    to: string,
    amount: number,
    source: string
  ): Observable<AxiosResponse<any>> {
    return this.httpService.get(EXCHANGERATE_API + 'convert', {
      params: {
        from,
        to,
        amount,
        source,
      }
    });
  }
}
