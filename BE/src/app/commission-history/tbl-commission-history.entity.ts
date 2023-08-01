import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Tbl_User } from '../user';

@Entity()
export class Tbl_Commission_History {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  userId: string;

  @ManyToOne(() => Tbl_User)
  @JoinColumn({ name: 'userId' })
  user: Tbl_User;

  @Column({ type: 'float' })
  adminCommission: number;

  @Column({ type: 'float' })
  platinumCommission: number;

  @Column({ type: 'float' })
  goldCommission: number;

  @Column()
  platinumReferralById?: string;

  @Column()
  goldReferralById?: string;

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  createdAt: Date;
}
