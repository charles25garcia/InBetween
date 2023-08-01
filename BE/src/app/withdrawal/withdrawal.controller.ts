import {
  Body,
  Controller,
  Param,
  Post,
  Get,
  Query,
  ParseArrayPipe,
  UseGuards,
} from '@nestjs/common';
import { WithdrawalService } from './withdrawal.service';
import { WithdrawalRequestModel } from '@shared/models';
import { Serialize } from '@core/interceptors';
import { UpdateWithdrawalDto, WithdrawalDto } from '@core/dtos';
import {
  UserRoleEnum,
  WithdrawalTypeEnum,
} from '@core/enums';
import { GetUser } from '@core/decorators';
import { SilverNotAllowedGuard } from '@core/guards';
import { UserStatsService } from '../user-stats';
import { CommissionService } from '../commission/commission.service';
import { Tbl_User_Role } from '../user-role';
import { CommonStatusEnum } from '@shared/enums';

@Controller('withdrawal')
export class WithdrawalController {
  constructor(
    private withdrawalService: WithdrawalService,
    private userStatsService: UserStatsService,
    private commissionService: CommissionService,
  ) {}

  @Post('request-chips')
  async requestChips(@Body() { userId, amount }: WithdrawalRequestModel) {
    const result = await this.withdrawalService.insertChipsWithdrawal(
      userId,
      amount,
    );

    return {
      chips: result.stats.chips,
    };
  }

  @Post('request-commission')
  async requestCommission(@Body() { userId, amount }: WithdrawalRequestModel) {
    const result = await this.withdrawalService.insertCommissionWithdrawal(
      userId,
      amount,
    );

    return {
      amount: result.commission.amount,
      lastUpdated: result.commission.lastUpdated,
    };
  }

  @Post('cancel-chips-request/:requestId')
  async cancelChipsRequest(@Param('requestId') requestId: number) {
    const result = await this.withdrawalService.cancelChipsRequest(requestId);

    return {
      chips: result.stats.chips,
    };
  }

  @Post('cancel-commission-request/:requestId')
  async cancelCommissionRequest(@Param('requestId') requestId: number) {
    const result = await this.withdrawalService.cancelCommissionRequest(
      requestId,
    );

    return {
      commission: result.commission,
    };
  }

  @Get('chips/:userId')
  @Serialize(WithdrawalDto)
  getChipsWithdrawalsByUserId(@Param('userId') userId: string) {
    return this.withdrawalService.getChipsWithdrawals(userId);
  }

  @Get('pending-chips/:type')
  getChipsPendingWithdrawalsByType(@Param('type') type: WithdrawalTypeEnum) {
    return this.withdrawalService.getChipsPendingWithdrawalsByType(type);
  }

  @Get()
  getChipsPendingWithdrawals(
    @Query('take') take: number,
    @Query('statuses', new ParseArrayPipe({ items: String }))
    statuses: CommonStatusEnum[],
  ) {
    return this.withdrawalService.getChipsPendingWithdrawals(take, statuses);
  }

  @Post('update-pending-chips')
  @UseGuards(SilverNotAllowedGuard)
  async updateChipsPendingWithdrawals(
    @Body() updateWithdrawalDto: UpdateWithdrawalDto,
    @GetUser()
    sender: { userRole: Tbl_User_Role; id: string }, // Supplied by NoSilverGuard
  ) {
    const withdrawal = await this.withdrawalService.updatePendingWithdrawal(
      updateWithdrawalDto,
    );

    let res;

    if (withdrawal.status === CommonStatusEnum.APPROVED) {
      // Add chips to approver
      res = await this.userStatsService.addChips(sender.id, withdrawal.amount);
    } else if (withdrawal.status === CommonStatusEnum.DECLINED) {
      // Add chips to requestor
      res = await this.userStatsService.addChips(
        withdrawal.userId,
        withdrawal.amount,
      );
    }

    return res;
  }

  @Post('update-pending-commission')
  @UseGuards(SilverNotAllowedGuard)
  async updateCommissionPendingWithdrawals(
    @Body() updateWithdrawalDto: UpdateWithdrawalDto,
    @GetUser()
    sender: { userRole: Tbl_User_Role; id: string }, // Supplied by NoSilverGuard
  ) {
    const withdrawal = await this.withdrawalService.updatePendingWithdrawal(
      updateWithdrawalDto,
    );

    if (withdrawal.status === CommonStatusEnum.APPROVED) {
      // Add commision to approver
      return await this.commissionService.addCommission(
        sender.id,
        withdrawal.amount,
      );
    } else if (withdrawal.status === CommonStatusEnum.DECLINED) {
      // Add commision to rquestor
      await this.commissionService.addCommission(
        updateWithdrawalDto.userId,
        withdrawal.amount,
      );
    }
  }

  @Get('commissions/:userId')
  @Serialize(WithdrawalDto)
  getCommissionsWithdrawalsByUserId(@Param('userId') userId: string) {
    return this.withdrawalService.getCommissionWithdrawals(userId);
  }

  @Post('/pending-request/user/:type')
  @UseGuards(SilverNotAllowedGuard)
  @Serialize(WithdrawalDto)
  getRequestForUser(
    @GetUser()
    { userRole, referralId }: { userRole: Tbl_User_Role; referralId: string }, // Supplied by NoSilverGuard
    @Param('type') type: WithdrawalTypeEnum,
  ) {
    switch (userRole.id) {
      case UserRoleEnum.GOLD:
        return this.withdrawalService.getWithdrawals(
          referralId,
          [type],
          [CommonStatusEnum.PENDING],
          [UserRoleEnum.SILVER],
        );
      case UserRoleEnum.PLATINUM:
        return this.withdrawalService.getWithdrawals(
          referralId,
          [type],
          [CommonStatusEnum.PENDING],
          [UserRoleEnum.GOLD],
        );
      default:
        break;
    }
  }
}
