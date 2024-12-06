import { Test, TestingModule } from '@nestjs/testing';
import { ModelResultsService } from './model-results.service';

describe('ModelResultsService', () => {
  let service: ModelResultsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ModelResultsService],
    }).compile();

    service = module.get<ModelResultsService>(ModelResultsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
