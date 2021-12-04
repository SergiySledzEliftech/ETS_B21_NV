import { IsString } from 'class-validator'

export class UpdateUserDto {
  @IsString()
  readonly nickname: string;
  
  @IsString()
  readonly avatar: string;
  
  @IsString()
  readonly firstName: string;
  
  @IsString()
  readonly lastName: string;
  
  @IsString()
  readonly number: string;
  
  @IsString()
  readonly facebook: string;
  
  @IsString()
  readonly linkedin: string;
  
  @IsString()
  readonly twitter: string;
  
  @IsString()
  readonly instagram: string;
}
