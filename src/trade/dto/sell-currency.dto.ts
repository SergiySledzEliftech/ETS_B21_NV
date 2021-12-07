import { ApiProperty } from "@nestjs/swagger";

export class SellCurrencyDto {
  @ApiProperty()
  readonly name: string;
  
  @ApiProperty()
  readonly amount: number;
  
  @ApiProperty()
  readonly userId: string;
}