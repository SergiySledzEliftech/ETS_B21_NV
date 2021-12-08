import { ApiProperty } from "@nestjs/swagger";

export default class TransactionInterface {
  @ApiProperty()
  date: Date;
  
  @ApiProperty()
  currencyName: string;
  
  @ApiProperty()
  amount: number;
  
  @ApiProperty()
  rate: number;
  
  @ApiProperty()
  spent: number;
}
