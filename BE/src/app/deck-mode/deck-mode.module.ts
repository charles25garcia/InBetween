import { Module } from '@nestjs/common';
import { DeckModeService } from './deck-mode.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Tbl_Deck_Mode } from './tbl-deck-mode.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Tbl_Deck_Mode])],
  providers: [DeckModeService],
  exports: [DeckModeService],
})
export class DeckModeModule {}
