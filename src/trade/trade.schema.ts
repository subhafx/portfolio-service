import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';
import { TradeType } from './trade.types';

export type TradeDocument = HydratedDocument<Trade>;

@Schema({ timestamps: true, collection: 'trades' })
export class Trade {
  @Prop({ required: true })
  stock_id: string;
  @Prop({ required: true, enum: TradeType })
  type: string;
  @Prop({ required: true })
  unit_price: number;
  @Prop({ required: true })
  quantity: number;
  @Prop({ required: true })
  total_amount: number;
}

export const TradeSchema = SchemaFactory.createForClass(Trade);
