import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ConfigModule } from '@nestjs/config';

import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './users/products.module';

import { UserCurrenciesController } from './user-currencies/user-currencies.controller';
import { GlobalCurrenciesService } from './global-currencies/global-currencies.service';
import { GlobalCurrenciesModule } from './global-currencies/global-currencies.module';
import { GlobalCurrenciesController } from './global-currencies/global-currencies.controller';

import { HttpModule } from '@nestjs/axios';

@Module({
  imports: [
    ConfigModule.forRoot(),
    MongooseModule.forRoot(
      `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.v3bg0.mongodb.net/${process.env.DB_NAME}?retryWrites=true&w=majority`,
    ),
    HttpModule,
    UsersModule,
    GlobalCurrenciesModule,
  ],
  controllers: [AppController, UserCurrenciesController, GlobalCurrenciesController],
  providers: [AppService, GlobalCurrenciesService],
})
export class AppModule {}
