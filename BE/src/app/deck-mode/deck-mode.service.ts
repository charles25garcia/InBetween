import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { BaseRepo } from '@core/classes';

import { Tbl_Deck_Mode } from './tbl-deck-mode.entity';

@Injectable()
export class DeckModeService extends BaseRepo<Tbl_Deck_Mode> {
  private deckStep = 0;

  constructor(
    @InjectRepository(Tbl_Deck_Mode)
    private deckModeRepo: Repository<Tbl_Deck_Mode>,
  ) {
    super(deckModeRepo);
  }
}
