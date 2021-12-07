
import { ObjectId } from "mongoose";
import { IsString, IsNumber, IsEmail } from 'class-validator'
import { ApiProperty } from "@nestjs/swagger";

export class CreateUserDto {
//   todo
  @ApiProperty()
  id?: ObjectId
  
  // @IsString()
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
  readonly avatar: string;

  // @IsNumber()
  readonly dollarBalance: number;

  // @IsNumber()
  readonly lastBonusTime: number;
}
