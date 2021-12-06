import { ObjectId } from "mongoose";

export class CreateUserDto {
  id?: ObjectId
  access_token?: string
  readonly nickname: string;
  readonly email: string;
  password: string;
  readonly avatar: string;
  readonly dollarBalance: number;
  readonly lastBonusTime: number;
}
