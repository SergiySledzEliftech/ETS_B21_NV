import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator'

export class UpdateUserDto {
  @IsString()
  @ApiProperty()
  readonly nickname: string;
  
  @IsString()
  @ApiProperty()
  readonly avatar: string;
  
  @IsString()
  @ApiProperty()
  readonly firstName: string;
  
  @IsString()
  @ApiProperty()
  readonly lastName: string;
  
  @IsString()
  @ApiProperty()
  readonly number: string;
  
  @IsString()
  @ApiProperty()
  readonly facebook: string;
  
  @IsString()
  @ApiProperty()
  readonly linkedin: string;
  
  @IsString()
  @ApiProperty()
  readonly twitter: string;
  
  @IsString()
  @ApiProperty()
  readonly instagram: string;
}
