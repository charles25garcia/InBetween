import { BaseRepo } from '@core/classes';
import { Injectable } from '@nestjs/common';
import { Tbl_Donation } from './tbl-donation.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class DonationService extends BaseRepo<Tbl_Donation> {
  constructor(
    @InjectRepository(Tbl_Donation)
    private donationRepo: Repository<Tbl_Donation>,
  ) {
    super(donationRepo);
  }
}
