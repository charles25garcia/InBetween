import { BaseRepo } from '@core/classes';
import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { Tbl_Withdrawal } from './tbl-withdrawal.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { In, Repository } from 'typeorm';
import {
  UserRoleEnum,
  WithdrawalTypeEnum,
} from '@core/enums';
import { UserStatsService } from '../user-stats';
import { UpdateWithdrawalDto } from '@core/dtos';
import { CommissionService } from '../commission/commission.service';
import { CommonStatusEnum } from '@shared/enums';

@Injectable()
export class WithdrawalService extends BaseRepo<Tbl_Withdrawal> {
  constructor(
    @InjectRepository(Tbl_Withdrawal)
    private withdrawalRepo: Repository<Tbl_Withdrawal>,
    private userStatsService: UserStatsService,
    private commissionService: CommissionService,
  ) {
    super(withdrawalRepo);
  }

  async insertChipsWithdrawal(
    userId: string,
    amount: number,
    status?: CommonStatusEnum,
  ) {
    const userChips = await this.userStatsService.getStatsByUserId(userId);

    if (userChips.chips < amount) {
      throw new HttpException('Invalid Chips amount.', HttpStatus.BAD_REQUEST);
    }

    const withdrawal = await this.insertWithdrawal(
      userId,
      amount,
      WithdrawalTypeEnum.CHIPS,
      status,
    );

    const latestStats = await this.userStatsService.deductChips(userId, amount);

    return {
      withdrawal,
      stats: latestStats,
    };
  }

  async insertCommissionWithdrawal(
    userId: string,
    amount: number,
    status?: CommonStatusEnum,
  ) {
    const commission = await this.commissionService.getCommissionByUserId(
      userId,
    );

    if (commission.amount < amount) {
      throw new HttpException(
        'Invalid Commission amount.',
        HttpStatus.BAD_REQUEST,
      );
    }

    const withdrawal = await this.insertWithdrawal(
      userId,
      amount,
      WithdrawalTypeEnum.COMMISSION,
      status,
    );

    const latestCommission = await this.commissionService.deductCommission(
      userId,
      amount,
    );

    return {
      withdrawal,
      commission: latestCommission,
    };
  }

  async insertWithdrawal(
    userId: string,
    amount: number,
    type: WithdrawalTypeEnum,
    status?: CommonStatusEnum,
  ) {
    const currentDate = new Date();

    return await this.create({
      userId,
      amount,
      type,
      dateTime: currentDate,
      status: !status ? CommonStatusEnum.PENDING : status,
    });
  }

  async cancelChipsRequest(requestId: number) {
    const withdrawal = await this.cancelRequest(requestId);

    return {
      withdrawal,
      stats: await this.userStatsService.addChips(
        withdrawal.userId,
        withdrawal.amount,
      ),
    };
  }

  async cancelCommissionRequest(requestId: number) {
    const withdrawal = await this.cancelRequest(requestId);

    return {
      withdrawal,
      commission: await this.commissionService.addCommission(
        withdrawal.userId,
        withdrawal.amount,
      ),
    };
  }

  async cancelRequest(requestId: number) {
    const request = await this.withdrawalRepo.findOne({
      where: {
        id: requestId,
      },
    });

    if (!request || request.status !== CommonStatusEnum.PENDING) {
      throw new HttpException('Invalid request.', HttpStatus.BAD_REQUEST);
    }
    request.status = CommonStatusEnum.CANCELLED;
    request.lastUpdate = new Date();

    const withdrawal = await this.withdrawalRepo.save(request);

    return withdrawal;
  }

  getUserWithdrawals(userId?: string) {
    if (userId) {
      return this.withdrawalRepo.find({
        where: { userId },
        relations: ['user', 'approver'],
      });
    }

    return this.withdrawalRepo.find({ relations: ['user', 'approver'] });
  }

  getChipsWithdrawals(userId?: string) {
    if (userId) {
      return this.withdrawalRepo.find({
        where: { userId, type: WithdrawalTypeEnum.CHIPS },
        relations: ['user', 'approver'],
      });
    }

    return this.withdrawalRepo.find({
      where: { type: WithdrawalTypeEnum.CHIPS },
      relations: ['user', 'approver'],
    });
  }

  getChipsPendingWithdrawalsByType(type: WithdrawalTypeEnum) {
    return this.withdrawalRepo.find({
      where: { status: CommonStatusEnum.PENDING, type },
      relations: ['user'],
    });
  }

  getChipsPendingWithdrawals(
    take: number,
    statuses: CommonStatusEnum[],
    orderDirection: 'ASC' | 'DESC' = 'DESC',
  ) {
    return this.withdrawalRepo.find({
      take,
      where: { status: In(statuses) },
      order: {
        dateTime: {
          direction: orderDirection,
        },
      },
      relations: ['user'],
    });
  }

  async updatePendingWithdrawal(updateWithdrawalDto: UpdateWithdrawalDto) {
    const { id, userId, status, comment } = updateWithdrawalDto;

    const withdrawal = await this.withdrawalRepo.findOne({
      where: { id, status: CommonStatusEnum.PENDING },
      relations: ['user'],
    });

    if (!withdrawal) {
      throw new HttpException('Invalid withdrawal', HttpStatus.NOT_FOUND);
    }

    withdrawal.status = status;
    withdrawal.approverUserId = userId;
    withdrawal.approverComments = comment;
    withdrawal.lastUpdate = new Date();

    return await this.withdrawalRepo.save(withdrawal);
  }

  getCommissionWithdrawals(userId?: string) {
    if (userId) {
      return this.withdrawalRepo.find({
        where: { userId, type: WithdrawalTypeEnum.COMMISSION },
        relations: ['user', 'approver'],
      });
    }

    return this.withdrawalRepo.find({
      where: { type: WithdrawalTypeEnum.COMMISSION },
      relations: ['user', 'approver'],
    });
  }

  getWithdrawals(
    referralId: string,
    types: WithdrawalTypeEnum[],
    status: CommonStatusEnum[],
    roles: (UserRoleEnum | null)[],
  ) {
    return this.withdrawalRepo.find({
      where: {
        user: { userRoleId: In(roles), referralById: referralId },
        type: In(types),
        status: In(status),
      },
      relations: ['user', 'approver'],
    });
  }

  getWithdrawalRequestsForAdmin(
    types: WithdrawalTypeEnum[],
    ...status: CommonStatusEnum[]
  ) {
    return this.withdrawalRepo.find({
      where: {
        user: {
          userRoleId: In([UserRoleEnum.PLATINUM, UserRoleEnum.SILVER]),
          referralById: null,
        },
        type: In(types),
        status: In(status),
      },
      relations: ['user', 'approver'],
    });
  }
}
