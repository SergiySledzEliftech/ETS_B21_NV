import {
  Controller,
  Post,
  Query,
} from '@nestjs/common';
import { Observable } from 'rxjs';
import { TradeService } from './trade.service';

import { BuyCurrencyDto } from './dto/buy-currency.dto';
import { SellCurrencyDto } from './dto/sell-currency.dto';

@Controller('trade')
export class TradeController {
  constructor(
    private readonly tradeService: TradeService,
  ) {}

  @Post('buy')
  buyCurrency(@Query() query: BuyCurrencyDto): Observable<any> {
    return this.tradeService.buyCurrency(query);
  }
}
