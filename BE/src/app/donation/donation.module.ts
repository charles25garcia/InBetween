import { Module } from '@nestjs/common';
import { DonationController } from './donation.controller';
import { DonationService } from './donation.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Tbl_Donation } from './tbl-donation.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Tbl_Donation])],
  controllers: [DonationController],
  providers: [DonationService],
  exports: [DonationService],
})
export class DonationModule {}
