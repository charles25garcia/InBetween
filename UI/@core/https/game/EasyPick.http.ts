import { SendChipsBetDto, SendPointsBetDto, StatsDto } from "~/@core/dtos";
import { BetModel, EasypickModel } from "~/@core/models";

export class GameHttp {
  static deckEventSource() {
    return new EventSource(`${this.getUrl()}/deck`);
  }

  static counterEventSource() {
    return new EventSource(`${this.getUrl()}/counter`);
  }

  static potBonusAmountEventSource() {
    return new EventSource(`${this.getSseUrl()}/pot-bonus-amount`);
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

  static async getStats(userId: string): Promise<StatsDto> {
    const {
      data: { chips, points, winStreakCount },
    } = (await $fetch(`${this.getUrl()}/get-stats/${userId}`)) as any;
    return {
      chips: chips,
      points: points,
      winStreakCount: winStreakCount,
    };
  }

  static async getEasyPick() {
    const { data } = await $fetch<{ data: any }>(
      `${this.getEasyPickUrl()}/geteasypick`
    );

    return data as EasypickModel[];
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

  private static getSseUrl(): string {
    const { $runtimeConfig } = useNuxtApp() as any;
    return (
      $runtimeConfig.public.api.baseUrl + $runtimeConfig.public.api.SSE.url
    );
  }
}
