import { Prop, SchemaFactory, Schema } from '@nestjs/mongoose';
import * as mongoose from 'mongoose';

export type UserDocument = User & mongoose.Document;

@Schema({ versionKey: false, timestamps: true })
export class User {
  @Prop({ required: true })
  nickname: string;

  @Prop({ required: false })
  password: string;

  @Prop({ required: true })
  email: string;

  @Prop({ default: '' })
  avatar: string;

  @Prop({ default: 50 })
  dollarBalance: number;

  @Prop({ required: true })
  lastBonusTime: number;

  @Prop({ default: '' })
  access_token: string;
  
}

export const UserSchema = SchemaFactory.createForClass(User);
