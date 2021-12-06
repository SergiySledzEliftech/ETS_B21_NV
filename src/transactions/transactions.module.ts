import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { TransactionsController } from './transactions.controller';
import { TransactionsService } from './transactions.service';
import { HttpModule } from '@nestjs/axios';

import { Transaction, TransactionSchema } from './schemas/transaction.schema';

@Module({
  imports: [
    MongooseModule.forFeature([
      {
        name: Transaction.name,
        schema: TransactionSchema,
      }
    ]),
    HttpModule
  ],
  controllers: [TransactionsController],
  providers: [TransactionsService],
  exports: [TransactionsService]
})
export class TransactionsModule {}