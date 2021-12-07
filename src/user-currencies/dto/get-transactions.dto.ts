import { ApiProperty } from "@nestjs/swagger";

export class GetTransactionsDto {
  @ApiProperty()
  readonly userId: string | undefined;
  
  @ApiProperty()
  readonly currencyName: string | undefined;
}