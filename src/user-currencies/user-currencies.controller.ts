import {
  Body,
  Controller,
  Get,
  Patch,
  Post,
  Delete,
  Query,
} from '@nestjs/common';
import { UserCurrenciesService } from './user-currencies.service';
import { Currency } from './schemas/currency.schema';

import { GetCurrencyDto } from './dto/get-currency.dto';
import { UserCurrencyDto } from './dto/user-currency.dto';
import { UpdateCurrencyDto } from './dto/update-currency.dto';
import { DeleteCurrencyByNameDto } from './dto/delete-currency-by-name.dto';
import { RemoveCurrencyBuyIdDto } from './dto/remove-currency-by-id.dto';

@Controller('userCurrencies')
export class UserCurrenciesController {
  constructor(private readonly userCurrenciesService: UserCurrenciesService) {
  }

  @Get()
  getCurrency(@Query() query: GetCurrencyDto): Promise<Currency> {
    const { userId, name } = query;
    return this.userCurrenciesService.getOneCurrency(userId, name);
  }

  @Get('all')
  gelAllCurrencies(@Query('userId') userId: string): Promise<Currency[]> {
    return this.userCurrenciesService.getAllCurrenciesByUserId(userId);
  }

  @Post()
  createNewCurrency(@Body() query: UserCurrencyDto): Promise<Currency> {
    return this.userCurrenciesService.createCurrency(query);
  }

  @Patch()
  updateCurrency(@Body() query: UpdateCurrencyDto): Promise<Currency> {
    return this.userCurrenciesService.updateCurrency(query);
  }

  @Delete('byId')
  deleteCurrencyById(@Body() body: RemoveCurrencyBuyIdDto): Promise<Currency> {
    return this.userCurrenciesService.removeCurrencyById(body.id);
  }

  @Delete('byName')
  deleteCurrencyByName(@Body() body: DeleteCurrencyByNameDto): Promise<Currency> {
    const { name, userId } = body;
    return this.userCurrenciesService.removeCurrencyByName(userId, name);
  }
}