import {
  SendChipsBetDto,
  SendPointsBetDto,
  StatsDto,
  UserBetLockedDto,
  WinstreakBonusSseDto,
} from "~/@core/dtos";
import { BetModel, EasypickModel } from "~/@core/models";

export class GameHttp {
  static async getCurrentDeckData() {
    const res = (await $fetch(`${this.getUrl()}/deck-data`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    })) as any;

    return res.data;
  }

  static async getCurrentPotBonusData() {
    const res = (await $fetch(`${this.getUrl()}/pot-bonus-data`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    })) as any;

    return res.data as WinstreakBonusSseDto;
  }

  static async submitPointsBet(
    userId: string,
    bets: BetModel[]
  ): Promise<SendPointsBetDto> {
    const res = (await $fetch(`${this.getUrl()}/submit-points-bet`, {
      method: "POST",
      body: {
        userId,
        bets,
      },
      headers: {
        "Content-Type": "application/json",
      },
    })) as any;

    return {
      winStreakCount: res.data.winStreakCount,
      points: res.data.points,
      result: res.data.result,
    };
  }

  static async submitChipsBet(
    userId: string,
    bets: BetModel[]
  ): Promise<SendChipsBetDto> {
    const res = (await $fetch(`${this.getUrl()}/submit-chips-bet`, {
      method: "POST",
      body: {
        userId,
        bets: bets.map((i) => ({
          amount: i.amount,
          type: i.type,
        })),
      },
      headers: {
        "Content-Type": "application/json",
      },
    })) as any;

    return {
      winStreakCount: res.data.winStreakCount,
      chips: res.data.chips,
      result: res.data.result,
    };
  }

  static async lockChips(userId: string, bets: BetModel[]): Promise<StatsDto> {
    const { data } = (await $fetch(`${this.getUrl()}/lock-chips-bet`, {
      method: "POST",
      body: {
        userId,
        bets,
      },
      headers: {
        "Content-Type": "application/json",
      },
    })) as any;

    return data;
  }

  static async lockPoints(userId: string, bets: BetModel[]): Promise<StatsDto> {
    const { data } = (await $fetch(`${this.getUrl()}/lock-points-bet`, {
      method: "POST",
      body: {
        userId,
        bets,
      },
      headers: {
        "Content-Type": "application/json",
      },
    })) as any;

    return data;
  }

  static async getStats(userId: string): Promise<StatsDto> {
    const {
      data: {
        chips,
        points,
        winStreakCount,
        chipsLocked,
        pointsLocked,
        userBets,
      },
    } = (await $fetch(`${this.getUrl()}/get-stats/${userId}`)) as any;

    return {
      chips: chips,
      points: points,
      winStreakCount: winStreakCount,
      bets: userBets ? BetHelper.GetBetTypes(userBets) : undefined,
      chipsLocked,
      pointsLocked,
    };
  }

  static async getEasyPick() {
    const { data } = await $fetch<{ data: any }>(
      `${this.getEasyPickUrl()}/geteasypick`
    );

    return data as EasypickModel[];
  }

  static async getChipsBetLockedData() {
    const { data } = await $fetch<{ data: any }>(
      `${this.getUrl()}/chips-bet-locked-data`
    );

    return data as UserBetLockedDto[];
  }

  static getEasyPickUrl(): string {
    const runtimeConfig = useRuntimeConfig();
    return (
      runtimeConfig.public.api.baseUrl + runtimeConfig.public.api.easypick.url
    );
  }

  private static getUrl(): string {
    const { $runtimeConfig } = useNuxtApp() as any;
    return (
      $runtimeConfig.public.api.baseUrl + $runtimeConfig.public.api.game.url
    );
  }

}
