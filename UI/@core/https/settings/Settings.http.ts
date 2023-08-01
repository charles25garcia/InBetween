import { WinstreakBonusDto } from "~/@core/dtos";

export class SettingHttp {
  static async getWinstreakConfigData() {
    const res = (await $fetch(`${this.getWinstreakConfigUrl()}/`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    })) as any;

    return res.data;
  }

  static async updateWinStreakConfigs(configs: WinstreakBonusDto[]) {
    const res = (await $fetch(
      `${this.getWinstreakConfigUrl()}/update-configs`,
      {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: {
          configs,
        },
      }
    )) as any;

    return res.data;
  }

  static async deleteWinStreakConfigs(ids: number[]) {
    const res = (await $fetch(
      `${this.getWinstreakConfigUrl()}/delete-configs`,
      {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
        body: {
          ids,
        },
      }
    )) as any;

    return res.data;
  }


  static async addWinStreakConfig(config: WinstreakBonusDto) {
    const res = (await $fetch(
      `${this.getWinstreakConfigUrl()}/add-config`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: {
          config,
        },
      }
    )) as any;

    return res.data;
  }

  private static getWinstreakConfigUrl(): string {
    const { $runtimeConfig } = useNuxtApp() as any;
    return (
      $runtimeConfig.public.api.baseUrl +
      $runtimeConfig.public.api.winstreakConfig.url
    );
  }
}
