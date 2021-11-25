import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type UserDocument = User & Document;

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
}

export const UserSchema = SchemaFactory.createForClass(User);
