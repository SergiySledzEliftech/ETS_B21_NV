import { ApiProperty } from "@nestjs/swagger";

export class GetRateByDate {
  @ApiProperty()
  readonly date: string;
  
  @ApiProperty()
  readonly currency: string;
}