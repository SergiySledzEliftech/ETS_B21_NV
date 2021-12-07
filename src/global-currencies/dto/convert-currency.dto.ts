import { ApiProperty } from '@nestjs/swagger';

export class ConvertCurrencyDto {
  @ApiProperty()
  readonly to: string;

  @ApiProperty()
  readonly amount: number;
}