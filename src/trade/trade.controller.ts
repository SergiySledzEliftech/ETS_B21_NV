import {
  Body,
  Controller,
  Post,
  Query,
} from '@nestjs/common';
import { Observable } from 'rxjs';
import { TradeService } from './trade.service';

import { BuyCurrencyDto } from './dto/buy-currency.dto';
import { SellCurrencyDto } from './dto/sell-currency.dto';
import { ApiSecurity } from '@nestjs/swagger';

@Controller('trade')
export class TradeController {
  constructor(
    private readonly tradeService: TradeService,
  ) {}

  @ApiSecurity('bearerAuth')
  @Post('buy')
  buyCurrency(@Body() body: BuyCurrencyDto): Observable<any> {
    return this.tradeService.buyCurrency(body);
  }
}
