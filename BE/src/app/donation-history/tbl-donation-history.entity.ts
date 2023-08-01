import {
  Column,
  Entity,
  JoinColumn,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Tbl_User } from '../user';

@Entity()
export class Tbl_Donation_History {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ nullable: false })
  fromUserId: string;

  @Column({ nullable: false })
  toUserId: string;

  @Column({ default: 0 })
  points: number;

  @Column({ default: 0 })
  chips: number;

  @Column({ default: 0 })
  pointsBefore: number;

  @Column({ default: 0 })
  chipsBefore: number;

  @Column({ default: 0 })
  actualPoints: number;

  @Column({ default: 0 })
  actualChips: number;

  @Column()
  dateTime: Date;

  @OneToOne(() => Tbl_User, (user) => user.donationHistories)
  @JoinColumn({ name: 'fromUserId', referencedColumnName: 'id' })
  donationFrom: Tbl_User;

  @OneToOne(() => Tbl_User, (user) => user.donatedHistories)
  @JoinColumn({ name: 'toUserId', referencedColumnName: 'id' })
  donatedTo: Tbl_User;
}
