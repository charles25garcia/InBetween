import { Injectable, Inject, forwardRef } from '@nestjs/common';
import { Tbl_Commission_History } from './tbl-commission-history.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { BaseRepo } from '@core/classes';

//Services
import { UserService } from '../user';
import { UserRoleEnum } from '@core/enums';

@Injectable()
export class CommissionHistoryService extends BaseRepo<Tbl_Commission_History> {
  constructor(
    @InjectRepository(Tbl_Commission_History)
    private commissionsRepo: Repository<Tbl_Commission_History>,
    @Inject(forwardRef(() => UserService)) private userService: UserService,
  ) {
    super(commissionsRepo);
  }

  async createHistory(userId: string, totalBets: number): Promise<void> {
    const totalDividends = totalBets * 0.1;
    let adminCommission = 0;
    let platinumCommission = 0;
    let goldCommission = 0;

    const user = await this.userService.getUserById(userId);

    if (user.referralById) {
      const mainReferrer = await this.userService.getReferrer(
        user.referralById,
      );
      if (mainReferrer.userRole?.id === UserRoleEnum.GOLD) {
        const platinumReferrer = await this.userService.getReferrer(
          mainReferrer.referralById,
        );
        adminCommission = totalDividends * 0.6;
        platinumCommission = totalDividends * 0.1;
        goldCommission = totalDividends * 0.1;
        await this.createCommission(
          userId,
          adminCommission,
          platinumCommission,
          goldCommission,
          platinumReferrer.referralId,
          mainReferrer.referralId,
        );
      } else {
        adminCommission = totalDividends * 0.6;
        platinumCommission = totalDividends * 0.2;
        await this.createCommission(
          userId,
          adminCommission,
          platinumCommission,
          goldCommission,
          mainReferrer.referralId,
        );
      }
    } else {
      adminCommission = totalDividends * 0.8;
      await this.createCommission(
        userId,
        adminCommission,
        platinumCommission,
        goldCommission,
      );
    }
  }

  async createCommission(
    userId: string,
    adminCommission: number,
    platinumCommission: number,
    goldCommission: number,
    platinumReferralById?: string,
    goldReferralById?: string,
  ): Promise<void> {
    const commission = {
      userId,
      adminCommission,
      platinumCommission,
      goldCommission,
      platinumReferralById,
      goldReferralById,
    };
    await this.create(commission);
  }

  async getCommissions(
    userRoleId: number,
    referralId: string,
  ): Promise<Tbl_Commission_History[]> {
    const currentDate = new Date();
    const formattedCurrentDate = currentDate.toISOString().split('T')[0];

    const queryBuilder = this.commissionsRepo
      .createQueryBuilder('commission_history')
      .innerJoinAndSelect('commission_history.user', 'user')
      .innerJoinAndSelect('user.userRole', 'userRole')
      .select(
        'SUM(commission_history.adminCommission) AS commission, user.fullName, user.username, userRole.roleDescription AS role,  DATE(commission_history.createdAt) AS commissionDate',
      )
      .where(`DATE(commission_history.createdAt) = :currentDate`, {
        currentDate: formattedCurrentDate,
      })
      .groupBy(
        'user.username, user.fullName, userRole.roleDescription, DATE(commission_history.createdAt)',
      );

    switch (userRoleId) {
      case 2:
        queryBuilder.where(
          'commission_history.platinumReferralById = :referralId',
          {
            referralId,
          },
        );
        queryBuilder.select(
          'SUM(commission_history.platinumCommission) AS commission, user.fullName, user.username, userRole.roleDescription AS role, DATE(commission_history.createdAt)  AS commissionDate',
        );
        break;
      case 3:
        queryBuilder.where(
          'commission_history.goldReferralById = :referralId',
          {
            referralId,
          },
        );
        queryBuilder.select(
          'SUM(commission_history.goldCommission) AS commission, user.fullName, user.username, userRole.roleDescription AS role, DATE(commission_history.createdAt) AS commissionDate',
        );
        break;
    }

    const commissions = await queryBuilder.getRawMany();

    return commissions;
  }
}
