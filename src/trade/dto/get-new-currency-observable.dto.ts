import { ApiProperty } from '@nestjs/swagger';

export class getNewCurrencyObservableDto {
  @ApiProperty()
  readonly userId: string;
  
  @ApiProperty()
  readonly name: string;
  
  @ApiProperty()
  readonly updatedAt: Date;
  
  @ApiProperty()
  readonly startedAt: Date;
  
  @ApiProperty()
  readonly amount: number;
}