import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { BaseRepo } from '@core/classes';
import { Tbl_Deck_Config } from './tbl-deck-config.entity';

@Injectable()
export class DeckConfigService extends BaseRepo<Tbl_Deck_Config> {
  constructor(
    @InjectRepository(Tbl_Deck_Config)
    private deckConfigRepo: Repository<Tbl_Deck_Config>,
  ) {
    super(deckConfigRepo);
  }

  async getConfig(): Promise<Tbl_Deck_Config> {
    const [config] = await this.getAll();

    return config;
  }
}
