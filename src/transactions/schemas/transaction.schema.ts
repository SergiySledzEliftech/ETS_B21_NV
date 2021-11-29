import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type TransactionDocument = Transaction & Document;

@Schema()
export class Transaction {
  @Prop()
  userId: string;

  @Prop()
  currencyName: string;

  @Prop()
  amount: number;

  @Prop()
  date: Date;

  @Prop()
  rate: number;

  @Prop()
  spent: number;
}

export const TransactionSchema = SchemaFactory.createForClass(Transaction);
