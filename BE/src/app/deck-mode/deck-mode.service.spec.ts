import { Test, TestingModule } from '@nestjs/testing';
import { DeckModeService } from './deck-mode.service';

describe('DeckModeService', () => {
  let service: DeckModeService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [DeckModeService],
    }).compile();

    service = module.get<DeckModeService>(DeckModeService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
