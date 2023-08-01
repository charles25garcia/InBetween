import { Injectable } from '@nestjs/common';

import { BaseRepo } from '@core/classes';
import { Tbl_Donation_History } from './tbl-donation-history.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { DonationHistoryModel } from '@shared/models';

@Injectable()
export class DonationHistoryService extends BaseRepo<Tbl_Donation_History> {
  constructor(
    @InjectRepository(Tbl_Donation_History)
    private donationHistory: Repository<Tbl_Donation_History>,
  ) {
    super(donationHistory);
  }

  insertHistory(donation: DonationHistoryModel) {
    this.create({
      ...donation,
      dateTime: donation.dateTime ? donation.dateTime : new Date(),
    });
  }

  getDonationsFromUserId(userId, limit?: number) {
    if (limit) {
      return this.donationHistory.find({
        where: { fromUserId: userId },
        relations: ['donationFrom', 'donatedTo'],
        take: limit,
        order: {
          id: {
            direction: 'DESC',
          },
        },
      });
    }

    return this.donationHistory.find({
      where: { fromUserId: userId },
      relations: ['donationFrom', 'donatedTo'],
      order: {
        id: {
          direction: 'DESC',
        },
      },
    });
  }

  getDonationToday() {
    const date = new Date();

    date.setDate(date.getDate() + 1);
    const currDate = date.toISOString().split('T')[0];

    return this.donationHistory
      .createQueryBuilder()
      .innerJoinAndSelect('Tbl_Donation_History.donationFrom', 'donationFrom')
      .innerJoinAndSelect('Tbl_Donation_History.donatedTo', 'donatedTo')
      .where('dateTime >= :startAt', {
        startAt: currDate,
      })
      .orderBy('Tbl_Donation_History.dateTime', 'DESC')
      .getMany();
  }
}
