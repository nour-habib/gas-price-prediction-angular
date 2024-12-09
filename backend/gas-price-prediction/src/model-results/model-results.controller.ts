import { Controller, Get } from '@nestjs/common';
import { ModelResultsService } from './model-results.service';

@Controller('model-results')
export class ModelResultsController {
  constructor(private readonly modelResultsService: ModelResultsService) {}

  @Get()
  getAllModelResults() {
    return this.modelResultsService.findAll();
  }

  @Get('/training')
  getTraining() {
    console.log('getTraining()');
    return this.modelResultsService.getTraining();
  }

  @Get('/testing')
  getTesting() {
    return this.modelResultsService.getTesting();
  }

  @Get('/training_y')
  getTrainingY() {
    return this.modelResultsService.getTrainingY();
  }

  @Get('/testing_y')
  getTestingY() {
    return this.modelResultsService.getTestingY();
  }

  @Get('/errorTrain')
  getErrorTrain() {
    return this.modelResultsService.getErrorTrain();
  }

  @Get('/errorTest')
  getErrorTest() {
    return this.modelResultsService.getErrorTest();
  }
}
