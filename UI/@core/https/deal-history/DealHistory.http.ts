import { DealHistoryDto } from "~/@core/dtos";

export class DealHistoryHttp {
  static async getDealHistoryByUserId(userId: string) {
    const { data } = await $fetch<{ data: DealHistoryDto[] }>(
      `${this.getUrl()}/user-deals/${userId}`
    );

    return data;
  }

  static async getDealHistories() {
    const { data } = await $fetch<{ data: DealHistoryDto[] }>(
      `${this.getUrl()}/5`
    );

    return data;
  }

  static async getTotalChipsDealsToday() {
    const { data } = await $fetch<{ data: { totalDeals: string } }>(
      `${this.getUrl()}/total-chips-deals-today`
    );

    return +data.totalDeals;
  }

  static getUrl(): string {
    const runtimeConfig = useRuntimeConfig();
    return (
      runtimeConfig.public.api.baseUrl +
      runtimeConfig.public.api.dealHistory.url
    );
  }
}
