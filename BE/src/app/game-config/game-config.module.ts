import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { GameConfigController } from './game-config.controller';

import { GameConfigService } from './game-config.service';
import { DeckModeModule } from 'src/app/deck-mode';

import { Tbl_Game_Config } from './tbl-game-config.entity';

import { SharedModule } from '@shared/shared.module';
import { UserStatsModule } from 'src/app/user-stats';
import { DeckConfigModule } from 'src/app/deck-config';
import { WinstreakBonusConfigModule } from 'src/app/winstreak-bonus-config';
import { UserWinnerModule } from 'src/app/user-winner';
import { UserBetLockedModule } from '../user-bet-locked';
import { CommissionHistoryModule } from '../commission-history';
import { DealHistoryModule } from '../deal-history';
import { CommissionModule } from '../commission/commission.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([Tbl_Game_Config]),
    SharedModule,
    DeckModeModule,
    UserStatsModule,
    DeckConfigModule,
    WinstreakBonusConfigModule,
    UserWinnerModule,
    UserBetLockedModule,
    CommissionHistoryModule,
    CommissionModule,
    DealHistoryModule,
  ],
  controllers: [GameConfigController],
  providers: [GameConfigService],
  exports: [GameConfigService],
})
export class GameConfigModule {}
