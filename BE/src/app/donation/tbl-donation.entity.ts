import { CommonStatusEnum } from '@shared/enums';
import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { Tbl_User } from '../user';

@Entity()
export class Tbl_Donation {
  @PrimaryGeneratedColumn()
  id: string;

  @Column()
  userid: string;

  @Column()
  dateTime: Date;

  @Column({ type: 'double' })
  chips: number;

  @Column()
  status: CommonStatusEnum;

  @ManyToOne0(() => Tbl_User, (user) => user.donations)
  @JoinColumn({ name: 'userId', referencedColumnName: 'id' })
  user: Tbl_User;
}
