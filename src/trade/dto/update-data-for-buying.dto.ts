import { ApiProperty } from '@nestjs/swagger';
import { Currency } from '../../user-currencies/schemas/currency.schema';

export class UpdateDataForBuyingDto {
  @ApiProperty()
  readonly rate: number;
  
  @ApiProperty()
  readonly amount: number;
  
  @ApiProperty()
  readonly currency: Currency;
  
  @ApiProperty()
  readonly currencyName: string;
  
  @ApiProperty()
  readonly userId: string;
  
  @ApiProperty()
  readonly spent: number;
  
  @ApiProperty()
  readonly currentDate: Date;
}