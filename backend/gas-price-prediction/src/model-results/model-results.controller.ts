import { Controller } from '@nestjs/common';
import { ModelResultsService } from './model-results.service';

@Controller('model-results')
export class ModelResultsController {
  constructor(private readonly modelResultsService: ModelResultsService) {}
  // @Get('/training') {

  // }

  // @Get('/testing') {

  // }

  // @Get('/error') {

  // }
}
