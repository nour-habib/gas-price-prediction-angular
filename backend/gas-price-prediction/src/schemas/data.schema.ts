import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export type DataDocument = HydratedDocument<Data>;

@Schema()
export class Data {
  @Prop()
  consumerPriceIndex: number;

  @Prop()
  crudeOilPrice: number;

  @Prop()
  oilProduction: number;

  @Prop()
  gasPrice: number;
}

// eslint-disable-next-line prettier/prettier
export const DataSchema = SchemaFactory.createForClass(Data);