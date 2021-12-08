
import { HttpService } from '@nestjs/axios';
import { Injectable } from '@nestjs/common';
import {map, take} from 'rxjs/operators';
import { lastValueFrom } from 'rxjs';
import { currenciesLogo } from './currencyLogos'

@Injectable()
export class CurrencyService {
	constructor(private httpService: HttpService) {}

	async fetchCurrencies(symbol: string = '') {
		const apiKey = process.env.currencyApiKey;
		const qString = `?CMC_PRO_API_KEY=${apiKey}&${symbol}`
		const api = `https://pro-api.coinmarketcap.com/v1/cryptocurrency/quotes/latest${qString}`

		const currencyStream$ = this.httpService.get(api)
					.pipe(
						map((response) => response.data.data),
					)

		return await lastValueFrom(currencyStream$)					
	}

	async getCurrencies(query) {
		return this.fetchCurrencies(`symbol=${query.symbol}`)
	}

	async getCurrenciesLogos(query) {
		return currenciesLogo[query.symbol]
	} 


	
}
