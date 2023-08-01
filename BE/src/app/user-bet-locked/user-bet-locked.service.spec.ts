import { Test, TestingModule } from '@nestjs/testing';
import { UserBetLockedService } from './user-bet-locked.service';

describe('UserBetLockedService', () => {
  let service: UserBetLockedService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [UserBetLockedService],
    }).compile();

    service = module.get<UserBetLockedService>(UserBetLockedService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
