import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { DeckConfigService } from './deck-config.service';
import { Tbl_Deck_Config } from './tbl-deck-config.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Tbl_Deck_Config])],
  providers: [DeckConfigService],
  exports: [DeckConfigService],
})
export class DeckConfigModule {}
