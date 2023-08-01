import { Controller, Get, Param } from '@nestjs/common';
import { DealHistoryService } from './deal-history.service';
import { DealHistoryDto } from '@core/dtos';
import { Serialize } from '@core/interceptors';
@Controller('deal-history')
export class DealHistoryController {
  constructor(private dealHistoryService: DealHistoryService) {}

  @Get('total-chips-deals-today')
  async getTotalChipsDealsToday() {
    const totalDeals = await this.dealHistoryService.getTotalChipsDealsToday();

    return totalDeals;
  }

  @Get('/:take')
  // @Public()
  @Serialize(DealHistoryDto)
  getCurrentDeals(@Param('take') take: number) {
    return this.dealHistoryService.getHistories(take);
  }

  @Get('/user-deals/:userId')
  @Serialize(DealHistoryDto)
  getHistoryByUserid(@Param('userId') userId: string) {
    return this.dealHistoryService.getHistoryByUserId(userId);
  }
}
