import { HttpModule } from '@nestjs/axios';
import { Module } from '@nestjs/common';
import { GlobalCurrenciesController } from './global-currencies.controller';
import { GlobalCurrenciesService } from './global-currencies.service';

@Module({
  imports: [HttpModule],
  controllers: [GlobalCurrenciesController],
  providers: [GlobalCurrenciesService],
  exports: [GlobalCurrenciesService]
})
export class GlobalCurrenciesModule {}
