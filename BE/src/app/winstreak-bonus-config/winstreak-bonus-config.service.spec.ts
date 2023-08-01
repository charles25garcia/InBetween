import { Test, TestingModule } from '@nestjs/testing';
import { WinstreakBonusConfigService } from './winstreak-bonus-config.service';

describe('WinstreakBonusConfigService', () => {
  let service: WinstreakBonusConfigService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [WinstreakBonusConfigService],
    }).compile();

    service = module.get<WinstreakBonusConfigService>(
      WinstreakBonusConfigService,
    );
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
