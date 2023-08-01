import { DonationHistoryDto } from "~/@core/dtos";

export class DonationHttp {
  static async getDonations(userId: string): Promise<DonationHistoryDto[]> {
    const { data } = await $fetch(`${this.getUrl()}/${userId}`, {
      method: "GET",
    });

    return data;
  }

  static async getDonationToday(): Promise<DonationHistoryDto[]> {
    const { data } = await $fetch<{ data: DonationHistoryDto[] }>(
      `${this.getUrl()}/today/`,
      {
        method: "GET",
      }
    );

    return data;
  }

  static getUrl(): string {
    const runtimeConfig = useRuntimeConfig();
    return (
      runtimeConfig.public.api.baseUrl +
      runtimeConfig.public.api.donationHistory.url
    );
  }
}
