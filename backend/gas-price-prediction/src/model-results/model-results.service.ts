import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { ModelResults } from 'src/schemas/model-results.schema';

@Injectable()
export class ModelResultsService {
  constructor(
    @InjectModel(ModelResults.name)
    private modelResultsModel: Model<ModelResults>,
  ) {}

  getTraining() {}

  getTesting() {}

  getError() {}
}
