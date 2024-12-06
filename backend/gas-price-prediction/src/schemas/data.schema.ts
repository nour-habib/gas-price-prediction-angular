import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export type DataDocument = HydratedDocument<Data>;

@Schema()
export class Data {
  @Prop()
  consumerPriceIndex: Array<number>;

  @Prop()
  crudeOilPrice: Array<number>;

  @Prop()
  oilProduction: Array<number>;

  @Prop()
  gasPrice: Array<number>;
}

// eslint-disable-next-line prettier/prettier
export const DataSchema = SchemaFactory.createForClass(Data);