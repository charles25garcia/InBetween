import { Controller, Param, Get } from '@nestjs/common';
import { DonationHistoryService } from './donation-history.service';
import { Serialize } from '@core/interceptors';
import { DonationHistoryDto } from '@core/dtos';

@Controller('donation-history')
@Serialize(DonationHistoryDto)
export class DonationHistoryController {
  constructor(private donationHistoryService: DonationHistoryService) {}

  @Get('/today')
  getDonationToday() {
    return this.donationHistoryService.getDonationToday();
  }

  @Get('/:userId')
  getDonations(@Param() { userId }) {
    return this.donationHistoryService.getDonationsFromUserId(userId);
  }
}
