import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Tbl_Winstreak_bonus_config } from './tbl-winstreak-bonus-config.entity';
import { WinstreakBonusConfigService } from './winstreak-bonus-config.service';
import { WinstreakBonusConfigController } from './winstreak-bonus-config.controller';

@Module({
  imports: [TypeOrmModule.forFeature([Tbl_Winstreak_bonus_config])],
  providers: [WinstreakBonusConfigService],
  exports: [WinstreakBonusConfigService],
  controllers: [WinstreakBonusConfigController],
})
export class WinstreakBonusConfigModule {}
