import { MongooseModule } from '@nestjs/mongoose';
import { Module } from '@nestjs/common';
import { UserCurrenciesController } from './user-currencies.controller';
import { UserCurrenciesService } from './user-currencies.service';
import { Currency, CurrencySchema } from './schemas/currency.schema'
import { Transaction, TransactionSchema } from './schemas/transaction.schema';
import { HttpModule } from '@nestjs/axios';

@Module({
  imports: [
    MongooseModule.forFeature([
      {
        name: Currency.name,
        schema: CurrencySchema,
      },
      {
        name: Transaction.name,
        schema: TransactionSchema,
      }
    ]),
    HttpModule
  ],
  controllers: [UserCurrenciesController],
  providers: [UserCurrenciesService],
})
export class UserCurrenciesModule {}