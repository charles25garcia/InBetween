import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Tbl_User_Stats } from './tbl-user-stats.entity';
import { Repository } from 'typeorm';

import { UserStatsDto } from '@core/dtos';
import { BaseRepo } from '@core/classes';

@Injectable()
export class UserStatsService extends BaseRepo<Tbl_User_Stats> {
  constructor(
    @InjectRepository(Tbl_User_Stats)
    private userStatsRepo: Repository<Tbl_User_Stats>,
  ) {
    super(userStatsRepo);
  }

  async create({ points, userId }: UserStatsDto): Promise<Tbl_User_Stats> {
    return await super.create({
      points,
      userId,
      dateTime: new Date(),
    });
  }

  getStatsByUserId(userId: string) {
    return this.userStatsRepo.findOne({ where: { userId } });
  }

  async updatePointStats(
    user: Tbl_User_Stats,
    prizeAmount: number,
    lostAmount: number,
  ) {
    const userStats: Tbl_User_Stats = {
      ...user,
      lastUpdatedDateTime: new Date(),
      points: user.points + (prizeAmount - lostAmount),
    };

    return this.userStatsRepo.save(userStats);
  }

  async updateChipsStats(
    user: Tbl_User_Stats,
    isWinner: boolean,
    prizeAmount: number,
    lostAmount: number,
    isOneBets = true,
  ) {
    let loserWinstreak = 0;

    if (!isOneBets) {
      loserWinstreak = user.winStreakCount;
    }

    const userStats: Tbl_User_Stats = {
      ...user,
      lastUpdatedDateTime: new Date(),
      winStreakCount: isWinner ? user.winStreakCount + 1 : loserWinstreak,
      chips: user.chips + (prizeAmount - lostAmount),
    };

    return this.userStatsRepo.save(userStats);
  }

  async resetWinStreak(user: Tbl_User_Stats) {
    const userStats: Tbl_User_Stats = {
      ...user,
      lastUpdatedDateTime: new Date(),
      winStreakCount: 0,
    };

    return this.userStatsRepo.save(userStats);
  }

  async addWinStreak(user: Tbl_User_Stats, addition = 1) {
    const userStats: Tbl_User_Stats = {
      ...user,
      lastUpdatedDateTime: new Date(),
      winStreakCount: user.winStreakCount + addition,
    };

    return this.userStatsRepo.save(userStats);
  }

  async deductPoints(userId: string, deduction: number) {
    const user = await this.getStatsByUserId(userId);

    if (!user) {
      throw new NotFoundException('User not found.');
    }

    user.points = user.points - deduction;

    this.userStatsRepo.save(user);
  }

  async deductChips(userId: string, deduction: number) {
    const user = await this.getStatsByUserId(userId);

    if (!user) {
      throw new NotFoundException('User not found.');
    }

    user.chips = user.chips - deduction;

    return this.userStatsRepo.save(user);
  }

  async addPoints(userId: string, points: number) {
    const user = await this.getStatsByUserId(userId);

    if (!user) {
      throw new NotFoundException('User not found.');
    }

    user.points = user.points + points;
    user.lastUpdatedDateTime = new Date();

    return this.userStatsRepo.save(user);
  }

  async addChips(userId: string, chips: number) {
    const userStats = await this.getStatsByUserId(userId);

    if (!userStats) {
      throw new NotFoundException('User not found.');
    }

    userStats.chips = userStats.chips + chips;
    userStats.lastUpdatedDateTime = new Date();

    return this.userStatsRepo.save(userStats);
  }

  async convertPointsToChips(userId: string, points: number) {
    const userStats = await this.getStatsByUserId(userId);

    if (!userStats) {
      throw new NotFoundException('User not found.');
    }

    userStats.chips += points / 500;
    userStats.points -= points;
    userStats.lastUpdatedDateTime = new Date();

    return this.userStatsRepo.save(userStats);
  }

  async resetWinstreak(userId: string) {
    const user = await this.getStatsByUserId(userId);

    if (!user) {
      throw new NotFoundException('User not found.');
    }

    user.winStreakCount = 0;

    return this.userStatsRepo.save(user);
  }

  async resetPoints(userId: string) {
    const userStats = await this.getStatsByUserId(userId);

    if (!userStats) {
      throw new NotFoundException('User not found.');
    }

    userStats.points = 1000;
    userStats.lastUpdatedDateTime = new Date();

    return this.userStatsRepo.save(userStats);
  }
}
