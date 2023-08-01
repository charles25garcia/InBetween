import { Test, TestingModule } from '@nestjs/testing';
import { DealHistoryController } from './deal-history.controller';

describe('DealHistoryController', () => {
  let controller: DealHistoryController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [DealHistoryController],
    }).compile();

    controller = module.get<DealHistoryController>(DealHistoryController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
