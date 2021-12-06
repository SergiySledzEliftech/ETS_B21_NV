import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { TransactionSchema } from '../transactions/schemas/transaction.schema'

import { TransactionHistoryController } from './transaction-history.controller';
import { TransactionHistoryService } from './transaction-history.service';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: 'Transaction', schema: TransactionSchema },
    ]),
  ],
  controllers: [TransactionHistoryController],
  providers: [TransactionHistoryService],
})
export class TransactionHistoryModule {}
