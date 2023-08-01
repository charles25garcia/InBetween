import { Module } from '@nestjs/common';

import {
  DeckConfigHelperService,
  GameService,
  MainSseService,
  PotBonusService,
  UserStatsHelperService,
} from './services';
import { DeckConfigModule } from 'src/app/deck-config';
import { WinstreakBonusConfigModule } from 'src/app/winstreak-bonus-config';
import { UserStatsModule } from 'src/app/user-stats';
import { UserWinnerModule } from 'src/app/user-winner';
import { UserBetLockedModule } from 'src/app/user-bet-locked';
import { DeckModeModule } from 'src/app/deck-mode';
import { GameHistoryModule } from 'src/app/game-history';

@Module({
  imports: [
    DeckConfigModule,
    WinstreakBonusConfigModule,
    UserStatsModule,
    UserWinnerModule,
    UserBetLockedModule,
    DeckModeModule,
    GameHistoryModule,
  ],
  controllers: [],
  providers: [
    GameService,
    DeckConfigHelperService,
    UserStatsHelperService,
    MainSseService,
    PotBonusService,
  ],
  exports: [
    GameService,
    DeckConfigHelperService,
    UserStatsHelperService,
    MainSseService,
    PotBonusService,
  ],
})
export class SharedModule {}
