import { IsNumber } from 'class-validator'

export class UpdateUserBalanceDto {
  @IsNumber()
  readonly dollarBalance: number;

  @IsNumber()
  readonly lastBonusTime: number;
}
