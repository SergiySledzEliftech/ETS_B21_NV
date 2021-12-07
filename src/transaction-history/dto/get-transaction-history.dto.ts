import { ApiProperty } from "@nestjs/swagger";

export default class GetTransactionHistoryDto {
  @ApiProperty()
  readonly currency: string;
  
  @ApiProperty()
  readonly page: string;
  
  @ApiProperty()
  readonly limit: string;
  
  @ApiProperty()
  readonly userId: string;
  
  @ApiProperty()
  readonly dateRange: string;
}
