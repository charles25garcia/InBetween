import { Module } from '@nestjs/common';
import { DonationHistoryService } from './donation-history.service';
import { DonationHistoryController } from './donation-history.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Tbl_Donation_History } from './tbl-donation-history.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Tbl_Donation_History])],
  providers: [DonationHistoryService],
  controllers: [DonationHistoryController],
  exports: [DonationHistoryService],
})
export class DonationHistoryModule {}
