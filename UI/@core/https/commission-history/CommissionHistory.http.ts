import { CommissionHistoryDto } from "~/@core/dtos";

export class CommissionHistoryHttp {
  static async getCommissions(userDetails: CommissionHistoryDto) {
    const { userRoleId, referralId } = userDetails;

    let url = `${this.getUrl()}/get-commissions?userRole=${userRoleId}&referralId=${referralId}`;

    if (!referralId) {
      url = `${this.getUrl()}/get-commissions?userRole=${userRoleId}`;
    }

    return await $fetch(url);
  }

  private static getUrl(): string {
    const { $runtimeConfig } = useNuxtApp() as any;
    return (
      $runtimeConfig.public.api.baseUrl +
      $runtimeConfig.public.api.commissionHistory.url
    );
  }
}
