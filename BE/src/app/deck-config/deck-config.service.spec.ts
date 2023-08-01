import { Test, TestingModule } from '@nestjs/testing';
import { DeckConfigService } from './deck-config.service';

describe('DeckConfigService', () => {
  let service: DeckConfigService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [DeckConfigService],
    }).compile();

    service = module.get<DeckConfigService>(DeckConfigService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
