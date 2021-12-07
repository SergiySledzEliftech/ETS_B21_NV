import { ApiProperty } from "@nestjs/swagger";

export class RemoveCurrencyBuyIdDto {
  @ApiProperty()
  readonly id: string;
}