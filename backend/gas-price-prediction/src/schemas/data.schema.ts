import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export type DataDocument = HydratedDocument<Data>;

@Schema()
export class Data {
  @Prop()
  country: string;

  @Prop()
  modelType: string;

  @Prop()
  consumerPriceIndex: Array<number>;

  @Prop()
  crudeOilPrice: Array<number>;

  @Prop()
  oilProduction: Array<number>;

  @Prop()
  gasPrice: Array<number>;

  @Prop()
  correlationMatrix: Array<number>;

  @Prop()
  modelResultsTraining: Array<number>;

  @Prop()
  modelResultsTesting: Array<number>;

  @Prop()
  errorResults: Array<number>;
}

// eslint-disable-next-line prettier/prettier
export const DataSchema = SchemaFactory.createForClass(Data);