import { ApiProperty } from '@nestjs/swagger';
import { IsNumber } from 'class-validator'

export class UpdateUserBalanceDto {
  // @IsNumber()
  @ApiProperty()
  readonly dollarBalance: number;

  // @IsNumber()
  @ApiProperty()
  readonly lastBonusTime: number;
}
