import { BetTypeEnum } from '@core/enums';
import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Tbl_User_Bet_Locked {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  userId: string;

  @Column()
  points: number;

  @Column()
  chips: number;

  @Column({ type: 'tinyint' })
  betType: BetTypeEnum;

  @Column()
  lastBetDateTime: Date;

  // @ManyToOne(() => Tbl_User, (user) => user.betLocks)
  // @JoinColumn({ referencedColumnName: 'id' })
  // user: Tbl_User;
}
