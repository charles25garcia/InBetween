import { Test, TestingModule } from '@nestjs/testing';
import { RoleFeatureController } from './role-feature.controller';

describe('RoleFeatureController', () => {
  let controller: RoleFeatureController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [RoleFeatureController],
    }).compile();

    controller = module.get<RoleFeatureController>(RoleFeatureController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
