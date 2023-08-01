import { Serialize } from '@core/interceptors';
import { CommissionService } from './commission.service';
import { Controller, Get, Param } from '@nestjs/common';
import { CommissionDto } from '@core/dtos/commission/commission.dto';
import { Public } from '@core/decorators';

@Controller('commission')
export class CommissionController {
  constructor(private commissionService: CommissionService) {}

  @Get('user-commission/:userId')
  @Serialize(CommissionDto)
  @Public()
  getCommisionByUserId(@Param('userId') userId: string) {
    return this.commissionService.getCommissionByUserId(userId);
  }
}
