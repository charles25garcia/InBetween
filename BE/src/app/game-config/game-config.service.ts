import { Injectable, NotFoundException } from '@nestjs/common';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';

import { BaseRepo } from '@core/classes';

import { Tbl_Game_Config } from './tbl-game-config.entity';
import { DeckModeEnum } from '@shared/enums';

@Injectable()
export class GameConfigService extends BaseRepo<Tbl_Game_Config> {
  constructor(
    @InjectRepository(Tbl_Game_Config)
    private gameConfigRepo: Repository<Tbl_Game_Config>,
  ) {
    super(gameConfigRepo);
  }

  async getGameConfig(): Promise<Tbl_Game_Config> {
    const [gameConfig] = await this.getAll();

    return gameConfig;
  }

  async getFreePool() {
    const gameConfig = await this.getGameConfig();

    return gameConfig.freePool;
  }

  async setDeckMode(deckMode: DeckModeEnum): Promise<Tbl_Game_Config> {
    const gameConfig = await this.getGameConfig();

    if (!gameConfig) {
      throw new NotFoundException('config not found.');
    }

    gameConfig.deckMode = deckMode;

    return this.gameConfigRepo.save(gameConfig);
  }

  startDeckDealer(): Promise<Tbl_Game_Config> {
    return this.changeDeckDealerStatus(true);
  }

  stopDeckDealer(): Promise<Tbl_Game_Config> {
    return this.changeDeckDealerStatus(false);
  }

  private async changeDeckDealerStatus(
    isStart: boolean,
  ): Promise<Tbl_Game_Config> {
    const gameConfig = await this.getGameConfig();

    if (!gameConfig) {
      throw new NotFoundException('config not found.');
    }

    gameConfig.isRunning = isStart ? 1 : 0;

    return this.gameConfigRepo.save(gameConfig);
  }

  async addFreePool(freePool: number): Promise<void> {
    const gameConfig = await this.getGameConfig();

    const updatedFreePool = Number(freePool) + Number(gameConfig.freePool);

    gameConfig.freePool = updatedFreePool;

    await this.gameConfigRepo.save(gameConfig);
  }

  async deductFreePool(freePoolToDeduct: number) {
    const gameConfig = await this.getGameConfig();

    const updatedFreePool =
      Number(gameConfig.freePool) - Number(freePoolToDeduct);

    gameConfig.freePool = updatedFreePool;

    await this.gameConfigRepo.save(gameConfig);
  }
}
