import { ApiProperty } from '@nestjs/swagger';

export class BuyCurrencyDto {
  @ApiProperty()
  readonly currencyName: string;

  @ApiProperty()
  readonly userId: string;
  
  @ApiProperty()
  readonly spent: number;
}