import { ApiProperty } from "@nestjs/swagger";

export class getUpdateCurrencyObservableDto {
  @ApiProperty()
  readonly userId: string;
  
  @ApiProperty()
  readonly name: string;
  
  @ApiProperty()
  readonly updatedAt: Date;
  
  @ApiProperty()
  readonly amount: number;
}