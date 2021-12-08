import { Controller, Get, Query, Req } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { Request } from 'express';
import { CurrencyService } from './currency.service';

@Controller('currency')
export class CurrencyController {

	constructor(private readonly currencyService: CurrencyService,
				private httpService: HttpService) {}

	@Get('')
	async getCurrencyBySymbol(@Query() query: any) {
		return this.currencyService.getCurrencies(query)
	}

	@Get('/logo')
	async getCurrenciesLogos(@Query() query: any) {
		return this.currencyService.getCurrenciesLogos(query)
	}

	
}
