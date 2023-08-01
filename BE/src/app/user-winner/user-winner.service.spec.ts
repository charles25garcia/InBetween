import { Test, TestingModule } from '@nestjs/testing';
import { UserWinnerService } from './user-winner.service';

describe('UserWinnerService', () => {
  let service: UserWinnerService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [UserWinnerService],
    }).compile();

    service = module.get<UserWinnerService>(UserWinnerService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
