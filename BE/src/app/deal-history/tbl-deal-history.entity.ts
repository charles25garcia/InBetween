import { BetTypeEnum, MoneyTypeEnum } from '@core/enums';
import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Tbl_User } from '../user/tbl-user.entity';

@Entity()
export class Tbl_Deal_History {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  userId: string;

  @Column()
  inBetween: number;

  @Column()
  outBeyond: number;

  @Column()
  pair: number;

  @Column()
  trio: number;

  @Column()
  winAmount: number;

  @Column()
  lostAmount: number;

  @Column()
  roundResult: BetTypeEnum;

  @Column()
  dealNo: number;

  @Column()
  dateTime: Date;

  @Column()
  type: MoneyTypeEnum;

  @ManyToOne(() => Tbl_User, (user) => user.dealHistories)
  @JoinColumn({ referencedColumnName: 'id' })
  user: Tbl_User;
}
