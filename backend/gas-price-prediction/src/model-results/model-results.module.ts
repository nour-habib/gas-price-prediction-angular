import { Module } from '@nestjs/common';
import { ModelResultsService } from './model-results.service';
import { ModelResultsController } from './model-results.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { ModelResults } from 'src/schemas/model-results.entity';
import { ModelResultsSchema } from 'src/schemas/model-results.schema';

@Module({
  providers: [ModelResultsService],
  controllers: [ModelResultsController],
  imports: [
    MongooseModule.forFeature([
      { name: ModelResults.name, schema: ModelResultsSchema },
    ]),
  ],
  exports: [ModelResultsService],
})
export class ModelResultsModule {}
