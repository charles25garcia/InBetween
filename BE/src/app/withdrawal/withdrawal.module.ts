import { Module, forwardRef } from '@nestjs/common';
import { WithdrawalService } from './withdrawal.service';
import { WithdrawalController } from './withdrawal.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Tbl_Withdrawal } from './tbl-withdrawal.entity';
import { UserStatsModule } from '../user-stats';
import { CommissionModule } from '../commission/commission.module';
import { UserModule } from '../user';
import { JwtModule } from '@nestjs/jwt';
import { JwtConfig } from '@config/jwt.config';

@Module({
  imports: [
    TypeOrmModule.forFeature([Tbl_Withdrawal]),
    UserStatsModule,
    CommissionModule,
    forwardRef(() => UserModule),
    JwtModule.registerAsync(JwtConfig),
    UserStatsModule,
    CommissionModule,
  ],
  providers: [WithdrawalService],
  controllers: [WithdrawalController],
  exports: [WithdrawalService],
})
export class WithdrawalsModule {}
