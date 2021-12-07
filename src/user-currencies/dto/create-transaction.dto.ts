import { ApiProperty } from "@nestjs/swagger";

export class CreateTransactionDto {
  @ApiProperty()
  userId: string;
  
  @ApiProperty()
  currencyName: string;
  
  @ApiProperty()
  amount: number;
  
  @ApiProperty()
  date: Date;
  
  @ApiProperty()
  rate: number;
  
  @ApiProperty()
  spent: number;
}
