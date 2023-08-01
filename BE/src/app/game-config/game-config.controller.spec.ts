import { Test, TestingModule } from '@nestjs/testing';
import { GameConfigController } from './game-config.controller';

describe('GameConfigController', () => {
  let controller: GameConfigController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [GameConfigController],
    }).compile();

    controller = module.get<GameConfigController>(GameConfigController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
