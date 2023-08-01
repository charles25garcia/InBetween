import { InjectRepository } from '@nestjs/typeorm';
import { In, Repository } from 'typeorm';
import { Injectable, NotFoundException } from '@nestjs/common';

import { BaseRepo } from '@core/classes';
import { Tbl_Winstreak_bonus_config } from './tbl-winstreak-bonus-config.entity';
import { WinstreakBonusDto } from '@core/dtos';

@Injectable()
export class WinstreakBonusConfigService extends BaseRepo<Tbl_Winstreak_bonus_config> {
  constructor(
    @InjectRepository(Tbl_Winstreak_bonus_config)
    private winstreakBonusConfigRepo: Repository<Tbl_Winstreak_bonus_config>,
  ) {
    super(winstreakBonusConfigRepo);
  }

  async getWinstreakBonuses() {
    const winstreakBonuses = await this.getAll();

    return winstreakBonuses;
  }

  async updateWinstreakConfig(...configs: WinstreakBonusDto[]) {
    const ids = configs.map((i) => i.id);

    const winstreakBonuses = await this.winstreakBonusConfigRepo.find({
      where: {
        id: In(ids),
      },
    });

    // Update Existing
    winstreakBonuses.forEach((config) => {
      const newConfig = configs.find((i) => i.id === config.id);

      config.bonusPercent = newConfig.bonusPercent;
      config.winStreak = newConfig.winStreak;
    });

    return this.winstreakBonusConfigRepo.save(winstreakBonuses);
  }

  async addConfig(config: WinstreakBonusDto) {
    return await super.create({
      ...config,
    });
  }

  async deleteConfig(...ids: number[]) {
    return this.winstreakBonusConfigRepo.delete(ids);
  }

  async addPotBonus(incommingAmount: number) {
    const winstreakBonuses = await this.getWinstreakBonuses();

    if (!winstreakBonuses) {
      throw new NotFoundException('winstreakBonuses not found.');
    }

    winstreakBonuses.forEach((bonus) => {
      bonus.potBonusAmount =
        Number(bonus.potBonusAmount) +
        Number(incommingAmount) * Number(bonus.bonusPercent);
    });

    return this.winstreakBonusConfigRepo.save(winstreakBonuses);
  }

  async resetPotBonuses(winStreaks: number[]) {
    const winstreakBonuses = await this.winstreakBonusConfigRepo.find({
      where: [...winStreaks.map((i) => ({ winStreak: i }))],
    });

    if (!winstreakBonuses) {
      throw new NotFoundException('winstreakBonus not found.');
    }

    winstreakBonuses.forEach((i) => (i.potBonusAmount = 0));

    return this.winstreakBonusConfigRepo.save(winstreakBonuses);
  }
}
