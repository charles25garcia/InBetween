import { Column, Entity, JoinColumn, OneToOne, PrimaryColumn } from 'typeorm';

import { DeckModeEnum } from '@shared/enums';

import { Tbl_Game_Config } from 'src/app/game-config';

@Entity()
export class Tbl_Deck_Mode {
  @PrimaryColumn()
  mode: DeckModeEnum;

  @Column()
  timer: number;

  @Column()
  name: string;

  @Column()
  cardIndexes: string;

  @OneToOne(() => Tbl_Game_Config, (gameConfig) => gameConfig.gameDeckMode)
  @JoinColumn({ name: 'mode' })
  gameConfig: Tbl_Game_Config;
}
