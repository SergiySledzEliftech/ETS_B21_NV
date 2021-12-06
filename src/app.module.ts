import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ConfigModule } from '@nestjs/config';

import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TransactionHistoryModule } from './transaction-history/transaction-history.module';
import { UsersModule } from './users/users.module';
import { TradeModule } from './trade/trade.module';
import { UserCurrenciesModule } from './user-currencies/user-currencies.module';
import { GlobalCurrenciesModule } from './global-currencies/global-currencies.module';
import { HttpModule } from '@nestjs/axios';
import { TransactionsModule } from './transactions/transactions.module';

@Module({
  imports: [
    ConfigModule.forRoot(),
    MongooseModule.forRoot(
      `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.v3bg0.mongodb.net/${process.env.DB_NAME}?retryWrites=true&w=majority`,
    ),
    HttpModule,
    UsersModule,
    TransactionHistoryModule,
    GlobalCurrenciesModule,
    UserCurrenciesModule,
    TradeModule,
    TransactionsModule
  ],
  controllers: [
    AppController
  ],
  providers: [
    AppService
  ],
})
export class AppModule {}
