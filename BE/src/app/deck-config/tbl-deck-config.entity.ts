import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Tbl_Deck_Config {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'double' })
  allocationPercent: number;

  @Column({ type: 'double' })
  potBonusPercent: number;
}
