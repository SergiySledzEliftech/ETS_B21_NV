import { ApiProperty } from "@nestjs/swagger";

export default class DocumentToFind {
  @ApiProperty()
  date?: Record<string, string>;
  
  @ApiProperty()
  currencyName?: string | RegExp;
  
  @ApiProperty()
  userId?: string;
}
