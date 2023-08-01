import { BaseRepo } from '@core/classes';
import { Injectable } from '@nestjs/common';
import { Tbl_Deal_History } from './tbl-deal-history.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { DealHistoryDto } from '@core/dtos';
import { MoneyTypeEnum } from '@core/enums';

@Injectable()
export class DealHistoryService extends BaseRepo<Tbl_Deal_History> {
  constructor(
    @InjectRepository(Tbl_Deal_History)
    private dealHistoryRepo: Repository<Tbl_Deal_History>,
  ) {
    super(dealHistoryRepo);
  }

  inserChipsHistory(dto: DealHistoryDto) {
    const currDate = new Date();

    const newDeal = {
      ...dto,
      dateTime: currDate,
      type: MoneyTypeEnum.CHIPS,
    };

    return this.create(newDeal);
  }

  inserHistory(dto: DealHistoryDto, type: MoneyTypeEnum) {
    const currDate = new Date();

    const newDeal = {
      ...dto,
      dateTime: currDate,
      type,
    };

    return this.create(newDeal);
  }

  inserPointsHistory(dto: DealHistoryDto) {
    const currDate = new Date();

    const newDeal = {
      ...dto,
      dateTime: currDate,
      type: MoneyTypeEnum.POINTS,
    };

    return this.create(newDeal);
  }

  getHistoryByUserId(
    userId: string,
    limit = 15,
    orderDirection: 'ASC' | 'DESC' = 'DESC',
  ) {
    return this.dealHistoryRepo.find({
      where: { userId },
      take: limit,
      order: {
        dateTime: {
          direction: orderDirection,
        },
      },
      relations: ['user'],
    });
  }

  getHistories(take: number, orderDirection: 'ASC' | 'DESC' = 'DESC') {
    return this.dealHistoryRepo.find({
      take,
      order: {
        dateTime: {
          direction: orderDirection,
        },
      },
      relations: ['user'],
    });
  }

  getTotalChipsDealsToday() {
    const date = new Date();

    date.setDate(date.getDate() + 1);
    const currDate = date.toISOString().split('T')[0];

    return this.dealHistoryRepo
      .createQueryBuilder()
      .where('dateTime >= :startAt', {
        startAt: currDate,
      })
      .select('SUM(inBetween + outBeyond + pair + trio)', 'totalDeals')
      .getRawOne();
  }
}
