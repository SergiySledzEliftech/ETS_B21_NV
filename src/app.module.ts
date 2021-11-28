import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ConfigModule } from '@nestjs/config';

import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './users/users.module';

import { TradeModule } from './trade/trade.module';

import { UserCurrenciesModule } from './user-currencies/user-currencies.module';
import { GlobalCurrenciesService } from './global-currencies/global-currencies.service';
import { GlobalCurrenciesModule } from './global-currencies/global-currencies.module';
import { GlobalCurrenciesController } from './global-currencies/global-currencies.controller';

import { HttpModule } from '@nestjs/axios';
import { TransactionsController } from './transactions/transactions.controller';
import { TradeController } from './trade/trade.controller';
import { TradeService } from './trade/trade.service';

@Module({
  imports: [
    ConfigModule.forRoot(),
    MongooseModule.forRoot(
      `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.v3bg0.mongodb.net/${process.env.DB_NAME}?retryWrites=true&w=majority`,
    ),
    HttpModule,
    UsersModule,
    GlobalCurrenciesModule,
    UserCurrenciesModule,
    TradeModule,
  ],
  controllers: [
    AppController,
    GlobalCurrenciesController,
    TransactionsController,
    TradeController
  ],
  providers: [
    AppService,
    GlobalCurrenciesService,
    TradeService
  ],
})
export class AppModule {}
