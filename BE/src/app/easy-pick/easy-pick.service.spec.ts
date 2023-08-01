import { Test, TestingModule } from '@nestjs/testing';
import { EasyPickService } from './easy-pick.service';

describe('EasyPickService', () => {
  let service: EasyPickService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [EasyPickService],
    }).compile();

    service = module.get<EasyPickService>(EasyPickService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
