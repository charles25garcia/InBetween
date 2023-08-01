import { CommissionDto } from "~/@core/dtos";

export class CommissionHttp {
  static async getCommissionByUserId(userId: string) {
    const { data } = await $fetch<{ data: CommissionDto }>(
      `${this.getUrl()}/user-commission/${userId}`
    );

    return data;
  }

  private static getUrl(): string {
    const { $runtimeConfig } = useNuxtApp() as any;
    return (
      $runtimeConfig.public.api.baseUrl +
      $runtimeConfig.public.api.commission.url
    );
  }
}
