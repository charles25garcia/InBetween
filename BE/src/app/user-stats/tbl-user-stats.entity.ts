import { Column, Entity, OneToOne, PrimaryGeneratedColumn } from 'typeorm';
import { Tbl_User } from '../user';
import { Expose } from 'class-transformer';

@Entity()
export class Tbl_User_Stats {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  userId: string;

  @Column()
  @Expose()
  points: number;

  @Column()
  @Expose()
  chips: number;

  @Column()
  winStreakCount: number;

  @Column()
  @Expose()
  lastUpdatedDateTime: Date;

  @OneToOne(() => Tbl_User, (user) => user)
  user: Tbl_User;
}
