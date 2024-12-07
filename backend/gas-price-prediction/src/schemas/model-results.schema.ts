import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export type ModelResultsDocument = HydratedDocument<ModelResults>;

@Schema()
export class ModelResults {
  @Prop()
  training: Array<number>;

  @Prop()
  training_y: Array<number>;

  @Prop()
  testing: Array<number>;

  @Prop()
  testing_y: Array<number>;

  @Prop()
  errorTrain: Array<number>;

  @Prop()
  errorTest: Array<number>;
}

// eslint-disable-next-line prettier/prettier
export const ModelResultsSchema = SchemaFactory.createForClass(ModelResults);