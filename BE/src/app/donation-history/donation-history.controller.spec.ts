import { Test, TestingModule } from '@nestjs/testing';
import { DonationHistoryController } from './donation-history.controller';

describe('DonationHistoryController', () => {
  let controller: DonationHistoryController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [DonationHistoryController],
    }).compile();

    controller = module.get<DonationHistoryController>(
      DonationHistoryController,
    );
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
