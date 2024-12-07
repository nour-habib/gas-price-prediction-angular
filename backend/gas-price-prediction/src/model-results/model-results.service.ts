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

  getTraining() {
    return this.modelResultsModel.find({}, { training: 1 });
  }

  getTrainingY() {
    return this.modelResultsModel.find({}, { training_y: 1 });
  }

  getTesting() {
    return this.modelResultsModel.find({}, { testing: 1 });
  }

  getTestingY() {
    return this.modelResultsModel.find({}, { testing_y: 1 });
  }

  getErrorTrain() {
    return this.modelResultsModel.find({}, { errorTrain: 1 });
  }

  getErrorTest() {
    return this.modelResultsModel.find({}, { errorTest: 1 });
  }
}
