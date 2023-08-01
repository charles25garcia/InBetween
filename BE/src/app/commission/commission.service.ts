import { BaseRepo } from '@core/classes';
import {
  HttpException,
  HttpStatus,
  Inject,
  Injectable,
  forwardRef,
} from '@nestjs/common';
import { Tbl_Commission } from './tbl-commision.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UserService } from '../user';
import { UserRoleEnum } from '@core/enums';

@Injectable()
export class CommissionService extends BaseRepo<Tbl_Commission> {
  constructor(
    @InjectRepository(Tbl_Commission)
    private commissionRepo: Repository<Tbl_Commission>,
    @Inject(forwardRef(() => UserService)) private userService: UserService,
  ) {
    super(commissionRepo);
  }

  getCommissionByUserId(userId: string) {
    return this.commissionRepo.findOne({
      where: { userId },
      relations: ['user'],
    });
  }

  async addCommission(userId: string, amount: number) {
    const commission = await this.commissionRepo.findOne({ where: { userId } });

    if (!commission) {
      throw new HttpException('Invalid user', HttpStatus.NOT_FOUND);
    }

    const currentDate = new Date();
    commission.amount += amount;
    commission.lastUpdated = currentDate;

    return this.commissionRepo.save(commission);
  }

  async deductCommission(userId: string, amount: number) {
    const commission = await this.commissionRepo.findOne({ where: { userId } });

    if (!commission) {
      throw new HttpException('Invalid user', HttpStatus.NOT_FOUND);
    }

    const currentDate = new Date();
    commission.amount -= amount;
    commission.lastUpdated = currentDate;

    return this.commissionRepo.save(commission);
  }

  async proccessCommission(userId: string, totalBets: number): Promise<void> {
    const user = await this.userService.getUserById(userId);

    if (!user) {
      throw new HttpException('Invalid User.', HttpStatus.BAD_GATEWAY);
    }

    const totalDividends = totalBets * 0.1;
    let adminCommission = totalDividends * 0.8;

    if (!user.referralById || user.referralById.length < 1) {
      this.addCommission(this.userService.adminUser.id, adminCommission);
      return;
    }

    adminCommission = totalDividends * 0.6;
    const mainReferrer = await this.userService.getReferrer(user.referralById);

    if (!mainReferrer) {
      throw new HttpException('Invalid Referrer', HttpStatus.BAD_REQUEST);
      return;
    }
    switch (mainReferrer.userRoleId) {
      case UserRoleEnum.GOLD:
        const platinumReferrer = await this.userService.getReferrer(
          mainReferrer.referralById,
        );

        this.addCommission(mainReferrer.id, totalDividends * 0.1);
        this.addCommission(platinumReferrer.id, totalDividends * 0.1);

        break;
      case UserRoleEnum.PLATINUM:
        this.addCommission(mainReferrer.id, totalDividends * 0.2);

        break;
      default:
        break;
    }

    this.addCommission(this.userService.adminUser.id, adminCommission);
  }
}
