
import { ObjectId } from "mongoose";
import { IsString, IsNumber, IsEmail } from 'class-validator'
import { ApiProperty } from "@nestjs/swagger";

export class CreateUserDto {
//   todo
  @ApiProperty()
  id?: ObjectId
  
  // @IsString()
  @ApiProperty()
  access_token?: string
  
  @IsString()
  @ApiProperty()
  readonly nickname: string;

  @IsEmail()
  @ApiProperty()
  readonly email: string;

  @IsString()
  @ApiProperty()
  password?: string;

  // @IsString()
  @ApiProperty()
  readonly avatar: string;

  // @IsNumber()
  @ApiProperty()
  readonly dollarBalance: number;

  // @IsNumber()
  @ApiProperty()
  readonly lastBonusTime: number;
}
