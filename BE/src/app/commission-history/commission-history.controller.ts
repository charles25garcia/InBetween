import { Controller, Get, Query } from '@nestjs/common';
import { CommissionHistoryService } from './commission-history.service';
import { Tbl_Commission_History } from './tbl-commission-history.entity';

@Controller('commission-history')
export class CommissionHistoryController {
  constructor(private comissionsService: CommissionHistoryService) {}

  @Get('get-commissions')
  getComissions(
    @Query('userRole') userRole: number,
    @Query('referralId') referralId: string,
  ): Promise<Tbl_Commission_History[]> {
    return this.comissionsService.getCommissions(Number(userRole), referralId);
  }
}
