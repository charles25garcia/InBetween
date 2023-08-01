import { ColumnNumericTransformer } from '@shared/utils';
import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Tbl_Winstreak_bonus_config {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ default: 0 })
  winStreak: number;

  @Column({ type: 'double', default: 0 })
  bonusPercent: number;

  @Column('numeric', {
    precision: 7,
    scale: 2,
    transformer: new ColumnNumericTransformer(),
    default: 0,
  })
  potBonusAmount: number;
}
