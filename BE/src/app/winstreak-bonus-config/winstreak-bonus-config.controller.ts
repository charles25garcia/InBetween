import { Body, Controller, Delete, Get, Post, Put } from '@nestjs/common';
import { WinstreakBonusConfigService } from './winstreak-bonus-config.service';
import { WinstreakBonusDto } from '@core/dtos';

@Controller('winstreak-bonus-config')
export class WinstreakBonusConfigController {
  constructor(
    private winstreakBonusConfigService: WinstreakBonusConfigService,
  ) {}

  @Get()
  getWinstreaksConfig() {
    return this.winstreakBonusConfigService.getWinstreakBonuses();
  }

  @Put('update-configs')
  async updateWinstreakConfig(
    @Body() { configs }: { configs: WinstreakBonusDto[] },
  ) {
    await this.winstreakBonusConfigService.updateWinstreakConfig(...configs);

    return this.winstreakBonusConfigService.getWinstreakBonuses();
  }

  @Post('add-config')
  async addConfig(@Body() { config }: { config: WinstreakBonusDto }) {
    await this.winstreakBonusConfigService.addConfig(config);

    return this.winstreakBonusConfigService.getWinstreakBonuses();
  }

  @Delete('delete-configs')
  async deleteConfigsById(@Body() { ids }: { ids: number[] }) {
    await this.winstreakBonusConfigService.deleteConfig(...ids);
    return this.winstreakBonusConfigService.getWinstreakBonuses();
  }
}
