import { Injectable } from '@nestjs/common';
import { BehaviorSubject, filter } from 'rxjs';

import { DeckConfigModel, MainSseModel } from '@shared/models';
import { SseTypeEnum } from '@shared/enums';
import {
  UserBetLockedDto,
  UserStatsSseDto,
  WinstreakBonusDto,
} from '@core/dtos';
import { Tbl_Game_History } from 'src/app/game-history';

@Injectable()
export class MainSseService {
  private readonly _mainSse = new BehaviorSubject<MainSseModel>(undefined);

  private readonly mainSse$ = this._mainSse.asObservable();

  get mainSse(): MainSseModel {
    return this._mainSse.getValue();
  }
  set mainSse(value: MainSseModel) {
    this._mainSse.next(value);
  }

  isRunning = false;

  listenToMainSse(userId: string) {
    return this.mainSse$.pipe(
      filter(
        (data) =>
          (data?.filteredByUserId && userId === data?.userId) ||
          !data?.filteredByUserId,
      ),
      filter((data) => data?.type !== SseTypeEnum.Start),
      filter(() => this.isRunning),
    );
  }

  listenToMainSseByTypes(...types: SseTypeEnum[]) {
    return this.mainSse$.pipe(
      filter(
        (config) =>
          (config !== undefined && types.includes(config.type)) ||
          config?.type === SseTypeEnum.Start,
      ),
      filter(() => this.isRunning),
    );
  }

  startMainSse() {
    this.isRunning = true;
    this._mainSse.next({
      type: SseTypeEnum.Start,
      data: {},
    });
  }

  sendDataToClients(sseData: MainSseModel) {
    this.mainSse = sseData;
  }

  sendCountDownToClient(countDown: number) {
    this.sendDataToClients({
      data: countDown,
      type: SseTypeEnum.Countdown,
    });
  }

  sendDeckDataToClient(deckData: DeckConfigModel) {
    this.sendDataToClients({
      data: deckData,
      type: SseTypeEnum.Deck,
    });
  }

  sendGameHistoryToClient(historyData: Tbl_Game_History[]) {
    this.sendDataToClients({
      data: historyData,
      type: SseTypeEnum.GameHistory,
    });
  }

  stopMainSse() {
    this.isRunning = false;
    this._mainSse.next({
      type: SseTypeEnum.Stop,
      data: {},
    });
  }

  sendUserStatsToClients(stats: UserStatsSseDto) {
    this.sendDataToClients({
      data: stats,
      userId: stats.userId,
      filteredByUserId: true,
      type: SseTypeEnum.UserStats,
    });
  }

  sendBetLockDataToClients(betLockData: UserBetLockedDto[]) {
    this.sendDataToClients({
      data: betLockData,
      type: SseTypeEnum.BetLockData,
    });
  }

  sendPotBonusToClients(
    potBonusData: WinstreakBonusDto[],
    numberOfWinners = 0,
  ) {
    this.sendDataToClients({
      data: {
        potBonusData: potBonusData.map((i) => ({
          winStreak: i.winStreak,
          bonusPercent: i.bonusPercent,
          potBonusAmount: Math.round(i.potBonusAmount),
        })),
        numberOfWinners,
      },
      type: SseTypeEnum.PotBonusData,
    });
  }
}
