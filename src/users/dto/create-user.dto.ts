import { IsString, IsNumber, IsEmail } from 'class-validator'

export class CreateUserDto {
  @IsString()
  readonly nickname: string;

  @IsEmail()
  readonly email: string;

  @IsString()
  password: string;

  @IsString()
  readonly avatar: string;

  @IsNumber()
  readonly dollarBalance: number;

  @IsNumber()
  readonly lastBonusTime: number;
}
