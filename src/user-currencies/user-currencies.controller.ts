import { Body, Controller, Delete, Get, Param, Patch, Post, Query } from '@nestjs/common';
import { GetCurrencyDto } from './dto/get-currency.dto';
import { UserCurrencyDto } from './dto/user-currency.dto';
import { PatchCurrencyDto } from './dto/patch-currency.dto';
import { PatchCurrencyQueryDto } from './dto/patch-currency-query.dto';
import { DeleteCurrencyDto } from './dto/delete-currency.dto';

interface UserCurrency {
  userId: string;
  name: string;
  purchaseDate: Date;
  amount: number;
  iconURL: string;
}

const userCurrencies: UserCurrency[] = [
  {
    userId: '1',
    name: 'Bitcoin',
    purchaseDate: new Date(2020, 9, 3),
    amount: 0.2,
    iconURL: './assets/bitcoin.jpg',
  },
  {
    userId: '1',
    name: 'Etherium',
    purchaseDate: new Date(2021, 2, 27),
    amount: 7,
    iconURL: './assets/etherium.jpg',
  },
  {
    userId: '1',
    name: 'XRP',
    purchaseDate: new Date(2019, 4, 7),
    amount: 7380,
    iconURL: './assets/xrp.jpg',
  },
  {
    userId: '2',
    name: 'Bitcoin',
    purchaseDate: new Date(2020, 3, 19),
    amount: 2.9,
    iconURL: './assets/bitcoin.jpg',
  },
  {
    userId: '2',
    name: 'Cardano',
    purchaseDate: new Date(2021, 14, 17),
    amount: 4590,
    iconURL: './assets/cardano.jpg',
  },
]

@Controller('userCurrencies')
export class UserCurrenciesController {

  @Get()
  get(@Query() query: GetCurrencyDto): UserCurrencyDto | UserCurrencyDto[] {
    const { userId, name } = query;
    const all = userCurrencies.filter(currency => currency.userId === userId);
    if (!name) {
      return all;
    }
    return all.find(currency => currency.name === name);
  }

  @Post()
  create(@Body() userCurrencyDto: UserCurrencyDto) {
    const { name, userId, amount } = userCurrencyDto;
    const userCurrency: UserCurrency = {
      name: name,
      userId: userId,
      amount: amount,
      iconURL: './assets/' + name + '.jpg',
      purchaseDate: new Date(),
    };
    userCurrencies.push(userCurrency);
    return userCurrency;
  }

  @Patch()
  update(
    @Body() patchCurrencyDto: PatchCurrencyDto,
    @Query() query: PatchCurrencyQueryDto
  ) {
    const { userId, name } = query;
    const currency = userCurrencies.find(currency => {
      return currency.userId === userId &&
        currency.name === name;
    });
    currency.amount = patchCurrencyDto.amount;
  }
  
  @Delete()
  remove(@Query() query: DeleteCurrencyDto) {
    const { userId, name } = query;
    const currencyIndex = userCurrencies.findIndex(currency => {
      return currency.userId === userId &&
        currency.name === name;
    });
    userCurrencies.splice(currencyIndex, 1);
  }
}
