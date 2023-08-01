import { Controller, Get } from '@nestjs/common';
import { EasyPickService } from './easy-pick.service';
import { Tbl_Easypick } from './tbl-easypick.entity';

@Controller('easy-pick')
export class EasyPickController {
  constructor(private easyPickService: EasyPickService) {}
  @Get('geteasypick')
  getEasyPickValues(): Promise<Tbl_Easypick[]> {
    return this.easyPickService.getEasyPickValues();
  }
}
