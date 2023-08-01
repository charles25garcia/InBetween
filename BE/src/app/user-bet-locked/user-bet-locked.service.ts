import { BaseRepo } from '@core/classes';
import { Injectable, NotFoundException } from '@nestjs/common';
import { Tbl_User_Bet_Locked } from './tbl-user-bet-locked.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { MoreThan, Repository } from 'typeorm';
import { BetTypeEnum, MoneyTypeEnum } from '@core/enums';
import { ArraySum } from '@shared/utils';
import { BetModel } from '@shared/models';
import { UserBetLockedDto } from '@core/dtos';

@Injectable()
export class UserBetLockedService extends BaseRepo<Tbl_User_Bet_Locked> {
  constructor(
    @InjectRepository(Tbl_User_Bet_Locked)
    private userBetLockedRepo: Repository<Tbl_User_Bet_Locked>,
  ) {
    super(userBetLockedRepo);
  }

  async addPoints(userId: string, bets: BetModel[]) {
    for (let index = 0; index < bets.length; index++) {
      const bet = bets[index];

      const userBet = await this.userBetLockedRepo.findOne({
        where: { userId, betType: bet.type },
      });

      if (!userBet) {
        throw new NotFoundException('user not found.');
      }

      userBet.points += bet.amount;

      await this.userBetLockedRepo
        .createQueryBuilder()
        .update(userBet)
        .set({ points: userBet.points })
        .where('id = :id', { id: userBet.id })
        .execute();
    }
  }

  async addChips(userId: string, bets: BetModel[]) {
    for (let index = 0; index < bets.length; index++) {
      const bet = bets[index];

      const userBet = await this.userBetLockedRepo.findOne({
        where: { userId, betType: bet.type },
      });

      if (!userBet) {
        throw new NotFoundException('user not found.');
      }

      userBet.chips += bet.amount;

      await this.userBetLockedRepo
        .createQueryBuilder()
        .update(userBet)
        .set({ chips: userBet.chips })
        .where('id = :id', { id: userBet.id })
        .execute();
    }
  }

  async currentChips(userId: string) {
    const user = await this.userBetLockedRepo.find({
      where: { userId },
    });

    return ArraySum(user.map((i) => i.chips));
  }

  async currentPoints(userId: string) {
    const user = await this.userBetLockedRepo.find({
      where: { userId },
    });

    return ArraySum(user.map((i) => i.points));
  }

  async getTotalChipsBet(): Promise<UserBetLockedDto[]> {
    // Add the sum and group by
    const user = await this.userBetLockedRepo
      .createQueryBuilder('tbl_user_bet_locked')
      .select('betType')
      .addSelect('SUM(chips)', 'totalAmount')
      .groupBy('betType')
      .getRawMany();

    return user.map(
      (i) =>
        ({
          ...i,
          totalAmount: +i.totalAmount,
        } as UserBetLockedDto),
    );
  }

  currentBet(userId: string) {
    return this.userBetLockedRepo.find({
      where: { userId },
    });
  }

  async currentBetValues(userId: string, type: MoneyTypeEnum) {
    const bets = await this.userBetLockedRepo.find({
      where: { userId },
    });

    const ascBets = bets.sort((a, b) => a.betType - b.betType);

    if (type === MoneyTypeEnum.CHIPS) {
      return ascBets.map((i) => i.chips);
    }

    return ascBets.map((i) => i.points);
  }

  async resetBet() {
    await this.userBetLockedRepo
      .createQueryBuilder()
      .update()
      .set({ chips: 0, points: 0 })
      .where('chips > 0')
      .orWhere('points > 0')
      .execute();
  }

  insertInitialValue(userId: string) {
    const initData = {
      userId: userId,
      chips: 0,
      points: 0,
      lastBetDateTime: new Date(),
    };

    return this.create([
      { ...initData, betType: BetTypeEnum.InBetween },
      { ...initData, betType: BetTypeEnum.OutBeyond },
      { ...initData, betType: BetTypeEnum.Pairs },
      { ...initData, betType: BetTypeEnum.Trio },
    ]);
  }

  getTotalChips() {
    return this.userBetLockedRepo
      .createQueryBuilder()
      .select('SUM(chips)', 'totaBets')
      .getRawOne();
  }

  getCurrentChipsBet(take?: number) {
    if (take) {
      return this.userBetLockedRepo.find({
        where: {
          chips: MoreThan(0),
        },
        take,
      });
    }

    return this.userBetLockedRepo.find({
      where: {
        chips: MoreThan(0),
      },
    });
  }
}
