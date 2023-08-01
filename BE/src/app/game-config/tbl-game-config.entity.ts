import {
  Column,
  Entity,
  JoinColumn,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

import { DeckModeEnum } from '@shared/enums';

import { Tbl_Deck_Mode } from 'src/app/deck-mode';

@Entity()
export class Tbl_Game_Config {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  deckMode: DeckModeEnum;

  @Column()
  isRunning: number;

  @OneToOne(() => Tbl_Deck_Mode, (deckMode) => deckMode.gameConfig)
  @JoinColumn({ name: 'deckMode' })
  gameDeckMode: Tbl_Deck_Mode;

  @Column()
  freePool: number;
}
