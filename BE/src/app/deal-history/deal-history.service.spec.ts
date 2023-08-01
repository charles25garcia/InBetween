import { Test, TestingModule } from '@nestjs/testing';
import { DealHistoryService } from './deal-history.service';

describe('DealHistoryService', () => {
  let service: DealHistoryService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [DealHistoryService],
    }).compile();

    service = module.get<DealHistoryService>(DealHistoryService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
