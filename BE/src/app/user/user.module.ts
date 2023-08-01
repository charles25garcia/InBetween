import { Module } from '@nestjs/common';
import { UserController } from './user.controller';
import { UserService } from './user.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Tbl_User } from './tbl-user.entity';
import { Tbl_User_Stats, UserStatsService } from '../user-stats';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';
import { JwtConfig } from '../../@config';
import { JwtStrategy } from '@shared/utils';
import { UserBetLockedModule } from '../user-bet-locked';
import { AdminUserController } from './admin-user.controller';
import { DonationHistoryModule } from '../donation-history';
import { AuditLogsModule } from '../audit-logs';
import { WithdrawalsModule } from '../withdrawal/withdrawal.module';
import { CommissionModule } from '../commission/commission.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([Tbl_User, Tbl_User_Stats]),
    PassportModule.register({ defaultStrategy: 'jwt' }),
    JwtModule.registerAsync(JwtConfig),
    UserBetLockedModule,
    DonationHistoryModule,
    AuditLogsModule,
    WithdrawalsModule,
    CommissionModule,
  ],
  controllers: [UserController, AdminUserController],
  providers: [UserService, JwtStrategy, UserStatsService],
  exports: [UserService, JwtStrategy, PassportModule],
})
export class UserModule {}
