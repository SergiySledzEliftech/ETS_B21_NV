import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type TransactionDocument = Transaction & Document;

@Schema()
export class Transaction {
  @Prop()
  _id: string;

  @Prop()
  userId: string;

  @Prop()
  date: Date;

  @Prop()
  currencyName: string;

  @Prop()
  amount: number;
}

export const TransactionSchema = SchemaFactory.createForClass(Transaction);
