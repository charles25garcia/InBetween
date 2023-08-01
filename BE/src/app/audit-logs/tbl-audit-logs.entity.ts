import { LogTypesEnum } from '@core/enums';
import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Tbl_User } from '../user';

@Entity()
export class Tbl_Audit_Logs {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  userId: string;

  @Column()
  title: string;

  @Column()
  description: string;

  @Column()
  loggerDateTime: Date;

  @Column()
  type: LogTypesEnum;

  @ManyToOne(() => Tbl_User, (user) => user.auditLogs)
  @JoinColumn({ referencedColumnName: 'id' })
  user: Tbl_User;
}
