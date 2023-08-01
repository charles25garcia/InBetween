// Dependencies
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Module } from '@nestjs/common';
import { ConfigModuleConfig, TypeOrmConfig } from './@config';

// Services
import { AppService } from './app.service';

// Controllers
import { AppController } from './app.controller';

// Modules
import { UserModule } from './app/user';
import { UserStatsModule } from './app/user-stats';
import { UserRoleModule } from './app/user-role';
import { PermissionModule } from './app/permission';
import { FeatureModule } from './app/feature';
import { RoleFeatureModule } from './app/role-feature';
import { GameConfigModule } from './app/game-config';

import { DeckModeModule } from 'src/app/deck-mode';
import { EasyPickModule } from 'src/app/easy-pick/easy-pick.module';
import { GameHistoryModule } from './app/game-history/game-history.module';
import { WinstreakBonusConfigModule } from './app/winstreak-bonus-config/winstreak-bonus-config.module';
import { DeckConfigModule } from './app/deck-config/deck-config.module';
import { UserWinnerModule } from './app/user-winner/user-winner.module';
import { ServerSentEventsModule } from './app/server-sent-events/server-sent-events.module';
import { UserBetLockedModule } from './app/user-bet-locked/user-bet-locked.module';
import { DonationHistoryModule } from './app/donation-history/';
import { CommissionHistoryModule } from './app/commission-history/commission-history.module';
import { CoreModule } from '@core/core.module';
import { DealHistoryModule } from './app/deal-history';
import { WithdrawalsModule } from './app/withdrawal/withdrawal.module';
import { CommissionModule } from './app/commission/commission.module';
import { DonationModule } from './app/donation/donation.module';

@Module({
  imports: [
    ConfigModule.forRoot(ConfigModuleConfig),
    TypeOrmModule.forRootAsync(TypeOrmConfig),
    DeckModeModule,
    UserModule,
    GameConfigModule,
    UserStatsModule,
    UserRoleModule,
    PermissionModule,
    FeatureModule,
    RoleFeatureModule,
    EasyPickModule,
    GameHistoryModule,
    WinstreakBonusConfigModule,
    DeckConfigModule,
    UserWinnerModule,
    ServerSentEventsModule,
    UserBetLockedModule,
    DonationHistoryModule,
    CommissionHistoryModule,
    CoreModule,
    DealHistoryModule,
    WithdrawalsModule,
    CommissionModule,
    DonationModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {
  // configure(consumer: MiddlewareConsumer) {
  //   consumer
  //     .apply(
  //       cookieSession({
  //         keys: [this.configService.get('COOKIE_KEY')],
  //       }),
  //     )
  //     .forRoutes('*');
  // }
}
