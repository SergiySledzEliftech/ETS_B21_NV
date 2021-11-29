import { Module } from '@nestjs/common';
import { TradeController } from './trade.controller';
import { TradeService } from './trade.service';
import { HttpModule } from '@nestjs/axios';

@Module({
  imports: [
    HttpModule
  ],
  controllers: [TradeController],
  providers: [TradeService],
  exports: [TradeService]
})
export class TradeModule {}
