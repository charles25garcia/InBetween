import { Test, TestingModule } from '@nestjs/testing';
import { EasyPickController } from './easy-pick.controller';

describe('EasyPickController', () => {
  let controller: EasyPickController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [EasyPickController],
    }).compile();

    controller = module.get<EasyPickController>(EasyPickController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
