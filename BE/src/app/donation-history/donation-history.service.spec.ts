import { Test, TestingModule } from '@nestjs/testing';
import { DonationHistoryService } from './donation-history.service';

describe('DonationHistoryService', () => {
  let service: DonationHistoryService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [DonationHistoryService],
    }).compile();

    service = module.get<DonationHistoryService>(DonationHistoryService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
