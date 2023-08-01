import { Test, TestingModule } from '@nestjs/testing';
import { WinstreakBonusConfigController } from './winstreak-bonus-config.controller';

describe('WinstreakBonusConfigController', () => {
  let controller: WinstreakBonusConfigController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [WinstreakBonusConfigController],
    }).compile();

    controller = module.get<WinstreakBonusConfigController>(
      WinstreakBonusConfigController,
    );
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
