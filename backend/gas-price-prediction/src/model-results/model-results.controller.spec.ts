import { Test, TestingModule } from '@nestjs/testing';
import { ModelResultsController } from './model-results.controller';

describe('ModelResultsController', () => {
  let controller: ModelResultsController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ModelResultsController],
    }).compile();

    controller = module.get<ModelResultsController>(ModelResultsController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
