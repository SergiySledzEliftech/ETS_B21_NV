import { ApiProperty } from '@nestjs/swagger';

export class CurrencyChangesDto {
  @ApiProperty()
  readonly start_rate: number;
  
  @ApiProperty()
  readonly end_rate: number;
  
  @ApiProperty()
  readonly change: number;
  
  @ApiProperty()
  readonly change_pct: number;
  }