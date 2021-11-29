import { MongooseModule } from '@nestjs/mongoose';
import { Module } from '@nestjs/common';
import { UserCurrenciesController } from './user-currencies.controller';
import { UserCurrenciesService } from './user-currencies.service';
import { Currency, CurrencySchema } from './schemas/currency.schema'
import { HttpModule } from '@nestjs/axios';

@Module({
  imports: [
    MongooseModule.forFeature([
      {
        name: Currency.name,
        schema: CurrencySchema,
      }
    ]),
    HttpModule
  ],
  controllers: [UserCurrenciesController],
  providers: [UserCurrenciesService],
  exports: [UserCurrenciesService]
})
export class UserCurrenciesModule {}