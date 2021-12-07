import { ApiProperty } from "@nestjs/swagger";

export class UpdateCurrencyDto {
  @ApiProperty()
  readonly amount: number;
  
  @ApiProperty()
  readonly updatedAt: Date;
  
  @ApiProperty()
  readonly userId: string;
  
  @ApiProperty()
  readonly name: string;
}