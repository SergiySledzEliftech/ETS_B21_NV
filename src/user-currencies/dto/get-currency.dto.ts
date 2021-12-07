import { ApiProperty } from "@nestjs/swagger";

export class GetCurrencyDto {
  @ApiProperty()
  readonly userId: string;
  
  @ApiProperty()
  readonly name: string;
}