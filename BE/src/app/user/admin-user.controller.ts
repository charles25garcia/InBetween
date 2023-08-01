import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  Put,
  UseGuards,
} from '@nestjs/common';

import { UserService } from './user.service';
import {
  CreatePlatinumUserDto,
  UpdateWithdrawalDto,
  UserOutputDto,
  WithdrawalDto,
} from '@core/dtos';
import { Serialize } from '@core/interceptors';
import { Tbl_User_Stats, UserStatsService } from '../user-stats';
import {
  AddStatsParamModel,
  ManualWithdrawalRequestModel,
} from '@shared/models';
import { DonationHistoryService } from '../donation-history';
import { AuditLogsService } from '../audit-logs';
import { WithdrawalService } from '../withdrawal/withdrawal.service';
import { CommissionService } from '../commission/commission.service';
import { AdminGuard, AdminPasswordGuard } from '@core/guards';
import { Tbl_Commission } from '../commission/tbl-commision.entity';
import { WithdrawalTypeEnum } from '@core/enums';
import { CommonStatusEnum } from '@shared/enums';

@Controller('admin-user')
@UseGuards(AdminGuard)
export class AdminUserController {
  constructor(
    private usersService: UserService,
    private userStatsService: UserStatsService,
    private donationHistoryService: DonationHistoryService,
    private auditLogsService: AuditLogsService,
    private withdrawalService: WithdrawalService,
    private commissionService: CommissionService,
  ) {}

  @Get()
  @Serialize(UserOutputDto)
  getUsers() {
    return this.usersService.getUsers();
  }

  @Get('audit-logs')
  getAuditLogs() {
    return this.auditLogsService.getLogs();
  }

  @Post('create-platinum-user')
  createPlatinumUser(@Body() body: CreatePlatinumUserDto) {
    return this.usersService.createPlatinumUser(body);
  }

  @Put('add-stats')
  @UseGuards(AdminPasswordGuard)
  async updateStats(
    @Body()
    { userId, points, chips }: AddStatsParamModel,
  ) {
    const _chips = chips || 0,
      _points = points || 0;

    await this.userStatsService.addChips(userId, _chips);
    const currentStats = await this.userStatsService.addPoints(userId, _points);

    this.donationHistoryService.insertHistory({
      fromUserId: this.usersService.adminUser.id,
      toUserId: userId,
      chips: _chips,
      points: _points,
      actualChips: currentStats.chips,
      actualPoints: currentStats.points,
      pointsBefore: currentStats.points - _points,
      chipsBefore: currentStats.chips - _chips,
    });

    return currentStats;
  }

  @Put('manual-withdrawal')
  @UseGuards(AdminPasswordGuard)
  async manualWithdrawal(
    @Body()
    { userId, commissionAmount, chips }: ManualWithdrawalRequestModel,
  ) {
    let currentCommission: Tbl_Commission, currentChips: Tbl_User_Stats;

    if (commissionAmount > 0) {
      await this.withdrawalService.insertCommissionWithdrawal(
        userId,
        commissionAmount,
      );

      currentCommission = await this.commissionService.deductCommission(
        userId,
        commissionAmount,
      );
    }

    if (chips > 0) {
      await this.withdrawalService.insertChipsWithdrawal(userId, chips);
      currentChips = await this.userStatsService.deductChips(userId, chips);
    }

    return {
      commissionAmount: currentCommission?.amount || 0,
      chips: currentChips?.chips || 0,
    };
  }

  @Get('withdrawals')
  getAllWithdrawals() {
    return this.withdrawalService.getUserWithdrawals();
  }

  @Post('/pending-withdrawals/:type')
  @Serialize(WithdrawalDto)
  getRequestForAdmin(@Param('type') type: WithdrawalTypeEnum) {
    return this.withdrawalService.getWithdrawalRequestsForAdmin(
      [type],
      CommonStatusEnum.PENDING,
    );
  }

  @Put('approve-withdrawal-request')
  @Serialize(WithdrawalDto)
  approveWithdrawalRequest(@Body() updateWithdrawalDto: UpdateWithdrawalDto) {
    return this.withdrawalService.updatePendingWithdrawal(updateWithdrawalDto);
  }

  @Put('decline-withdrawal-request/:type')
  async declineWithdrawalRequest(
    @Param('type') type: WithdrawalTypeEnum,
    @Body() updateWithdrawalDto: UpdateWithdrawalDto,
  ) {
    const withdrawal = await this.withdrawalService.updatePendingWithdrawal(
      updateWithdrawalDto,
    );
    if (type === WithdrawalTypeEnum.CHIPS) {
      // Add chips to requestor
      await this.userStatsService.addChips(
        withdrawal.userId,
        withdrawal.amount,
      );
    } else {
      // Add commission to requestor
      await this.commissionService.addCommission(
        updateWithdrawalDto.userId,
        withdrawal.amount,
      );
    }

    return withdrawal;
  }
}
