import { WithdrawalTypeEnum } from '@core/enums';
import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Tbl_User } from '../user';
import { CommonStatusEnum } from '@shared/enums';

@Entity()
export class Tbl_Withdrawal {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  userId: string;

  @Column()
  amount: number;

  @Column()
  type: WithdrawalTypeEnum;

  @Column()
  approverUserId: string;

  @Column()
  dateTime: Date;

  @Column()
  lastUpdate: Date;

  @Column()
  status: CommonStatusEnum;

  @Column()
  approverComments: string;

  @ManyToOne(() => Tbl_User, (user) => user.withdrawals)
  @JoinColumn({ referencedColumnName: 'id' })
  user: Tbl_User;

  @ManyToOne(() => Tbl_User, (user) => user.approvals)
  @JoinColumn({ name: 'approverUserId', referencedColumnName: 'id' })
  approver: Tbl_User;
}
