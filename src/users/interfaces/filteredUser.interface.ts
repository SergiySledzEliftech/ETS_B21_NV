import { ObjectId } from 'mongoose';

export interface IFilteredUser {
  access_token: string;
  _id?: ObjectId;
  readonly nickname: string;
  readonly email: string;
  readonly avatar: string;
  readonly dollarBalance: number;
  readonly lastBonusTime: number;
}
