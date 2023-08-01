import { Injectable } from '@nestjs/common';

import { BaseRepo } from '@core/classes';
import { Tbl_User_Winner } from './tbl-user-winner.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UserWinnerDto } from '@core/dtos';

@Injectable()
export class UserWinnerService extends BaseRepo<Tbl_User_Winner> {
  constructor(
    @InjectRepository(Tbl_User_Winner)
    private userWinnerRepo: Repository<Tbl_User_Winner>,
  ) {
    super(userWinnerRepo);
  }

  insertWinner(userWinner: UserWinnerDto) {
    return this.create(userWinner);
  }

  getCurrentWinners(roundId: string) {
    return this.userWinnerRepo.find({ where: { roundId } });
  }
}
