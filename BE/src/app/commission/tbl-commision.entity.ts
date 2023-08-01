import {
  Column,
  Entity,
  JoinColumn,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Tbl_User } from '../user';
import { Expose } from 'class-transformer';

@Entity()
export class Tbl_Commission {
  @PrimaryGeneratedColumn()
  @Expose()
  id: number;

  @Column()
  userId: string;

  @Column()
  @Expose()
  amount: number;

  @Column()
  @Expose()
  lastUpdated: Date;

  @OneToOne(() => Tbl_User, (user) => user.commission)
  @JoinColumn({ name: 'userId' })
  user: Tbl_User;
}
