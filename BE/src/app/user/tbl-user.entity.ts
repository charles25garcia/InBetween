import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  OneToOne,
  PrimaryColumn,
  UpdateDateColumn,
} from 'typeorm';
import { Tbl_User_Role } from '../user-role';
import * as crypto from 'crypto';
import * as bcrypt from 'bcryptjs';
import { Tbl_User_Stats } from '../user-stats';
import { Tbl_Donation_History } from '../donation-history';
import { Expose } from 'class-transformer';
import { Tbl_Audit_Logs } from '../audit-logs';
import { Tbl_Deal_History } from '../deal-history/tbl-deal-history.entity';
import { Tbl_Withdrawal } from '../withdrawal/tbl-withdrawal.entity';
import { Tbl_Commission } from '../commission/tbl-commision.entity';
import { UserRoleEnum } from '@core/enums';
import { Tbl_Donation } from '../donation/tbl-donation.entity';

@Entity()
export class Tbl_User {
  @PrimaryColumn()
  id: string;

  @Column()
  referralId: string;

  @Column()
  referralById: string;

  @Column()
  @Expose()
  fullName: string;

  @Column({ unique: true })
  @Expose()
  email: string;

  @Column()
  @Expose()
  contactNo: string;

  @Column()
  username: string;

  @Column()
  password: string;

  @Column()
  @Expose()
  userRoleId: UserRoleEnum;

  @Column({ default: true })
  isActive: boolean;

  @Column()
  resetPasswordToken?: string;

  @Column('datetime', { default: () => null })
  resetPasswordExpire?: Date;

  @Column()
  loginAttempt?: number;

  @Column()
  dateOfRegistration: Date;

  @Column({ default: true })
  showMechanics?: boolean;

  @UpdateDateColumn()
  lastUpdated: Date;

  @ManyToOne(() => Tbl_User_Role, (userRole) => userRole.users)
  @JoinColumn({ name: 'userRoleId' })
  userRole: Tbl_User_Role;

  @OneToOne(() => Tbl_User_Stats)
  @JoinColumn({ name: 'id', referencedColumnName: 'userId' })
  userStats: Tbl_User_Stats;

  @OneToMany(
    () => Tbl_Donation_History,
    (donationHistory) => donationHistory.donationFrom,
  )
  @JoinColumn({ referencedColumnName: 'fromUserId' })
  donationHistories: Tbl_Donation_History[];

  @OneToMany(
    () => Tbl_Donation_History,
    (donationHistory) => donationHistory.donatedTo,
  )
  @JoinColumn({ referencedColumnName: 'toUserId' })
  donatedHistories: Tbl_Donation_History[];

  @OneToMany(() => Tbl_Audit_Logs, (auditLogs) => auditLogs.user)
  @JoinColumn({ referencedColumnName: 'userId' })
  auditLogs: Tbl_Audit_Logs;

  @OneToMany(() => Tbl_Deal_History, (dealHistory) => dealHistory.user)
  @JoinColumn({ referencedColumnName: 'userId' })
  dealHistories: Tbl_Deal_History[];

  @OneToMany(() => Tbl_Withdrawal, (withdrawals) => withdrawals.user)
  @JoinColumn({ referencedColumnName: 'userId' })
  withdrawals: Tbl_Withdrawal[];

  @OneToMany(() => Tbl_Withdrawal, (withdrawals) => withdrawals.approver)
  @JoinColumn({ referencedColumnName: 'approverUserId' })
  approvals: Tbl_Withdrawal[];

  @OneToOne(() => Tbl_Commission, (commission) => commission.user)
  @JoinColumn({ name: 'id', referencedColumnName: 'userId' })
  commission: Tbl_Commission;

  @OneToMany(() => Tbl_Donation, (donation) => donation.donorUser)
  @JoinColumn({ name: 'id', referencedColumnName: 'userId' })
  donations: Tbl_Donation[];

  @OneToMany(() => Tbl_Donation, (donation) => donation.doneeUser)
  @JoinColumn({ name: 'id', referencedColumnName: 'doneeUserId' })
  donees: Tbl_Donation[];

  getResetPasswordToken() {
    const resetToken = crypto.randomBytes(20).toString('hex');

    this.resetPasswordToken = crypto
      .createHash('sha256')
      .update(resetToken)
      .digest('hex');

    this.resetPasswordExpire = new Date(Date.now() + 10 * 60 * 1000);

    return resetToken;
  }

  async matchPassword(enteredPassword: string): Promise<boolean> {
    return await bcrypt.compare(enteredPassword, this.password);
  }
}
