import { ApiProperty } from "@nestjs/swagger";

export class DeleteCurrencyByNameDto {
  @ApiProperty()
  readonly userId: string;
  
  @ApiProperty()
  readonly name: string;
}