export class UserStatshttp {
  static async convertPointsToChips(points: number) {
    const { data } = await $fetch<{
      data: {
        points: number;
        chips: number;
      };
    }>(`${this.getUrl()}/convert-point-to-chips/${points}`, {
      method: "PUT",
    });

    return data;
  }

  static async resetPoints() {
    const { data } = await $fetch<{
      data: {
        points: number;
      };
    }>(`${this.getUrl()}/reset-points`, {
      method: "PUT",
    });

    return data;
  }


  private static getUrl(): string {
    const { $runtimeConfig } = useNuxtApp() as any;
    return (
      $runtimeConfig.public.api.baseUrl +
      $runtimeConfig.public.api.userStats.url
    );
  }
}
