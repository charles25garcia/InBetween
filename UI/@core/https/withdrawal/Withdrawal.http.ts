import { UpdateWithdrawalDto, WithdrawalDto } from "~/@core/dtos";
import { WithdrawalStatusEnum, WithdrawalTypeEnum } from "~/@core/enums";
import { CommissionModel } from "~/@shared/models";

export class WithdrawalHttp {
  static async sendChipsWithdrawalRequest(userId: string, amount: number) {
    const { data } = await $fetch<{ data: { chips: number } }>(
      `${this.geUrl()}/request-chips`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: {
          userId,
          amount,
        },
      }
    );

    return data;
  }

  static async sendCommissionWithdrawalRequest(userId: string, amount: number) {
    const { data } = await $fetch<{
      data: { amount: number; lastUpdated: Date };
    }>(`${this.geUrl()}/request-commission`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: {
        userId,
        amount,
      },
    });

    return data;
  }

  static async cancelChipsRequest(requestId: number) {
    const { data } = await $fetch<{ data: { chips: number } }>(
      `${this.geUrl()}/cancel-chips-request/${requestId}`,
      {
        method: "POST",
      }
    );

    return data;
  }

  static async cancelCommissionRequest(requestId: number) {
    const { data } = await $fetch<{ data: { commission: CommissionModel } }>(
      `${this.geUrl()}/cancel-commission-request/${requestId}`,
      {
        method: "POST",
      }
    );

    return data.commission;
  }

  static async getChipsHistory(userId: string) {
    const { data } = await $fetch<{ data: WithdrawalDto[] }>(
      `${this.geUrl()}/chips/${userId}`,
      {
        method: "GET",
      }
    );

    return data;
  }

  static async getPendingWithdrawalsByType(type: WithdrawalTypeEnum) {
    const { data } = await $fetch<{ data: WithdrawalDto[] }>(
      `${this.geUrl()}/pending-chips/${type}`,
      {
        method: "GET",
      }
    );
    return data;
  }

  static async getCommissionsHistory(userId: string) {
    const { data } = await $fetch<{ data: WithdrawalDto[] }>(
      `${this.geUrl()}/commissions/${userId}`,
      {
        method: "GET",
      }
    );
    return data;
  }

  static async getPendingWithdrawals(
    take: number,
    statuses: WithdrawalStatusEnum[]
  ) {
    const { data } = await $fetch<{ data: WithdrawalDto[] }>(
      `${this.geUrl()}`,
      {
        params: {
          take,
          statuses: statuses,
        },
      }
    );
    return data;
  }

  static async updatePendingWithdrawals(
    updateWithdrawalDto: UpdateWithdrawalDto,
    type: string
  ) {
    const { data } = await $fetch<{ data: { chips: number } }>(
      `${this.geUrl()}/update-pending-${type}`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: updateWithdrawalDto,
      }
    );

    return data;
  }

  static async getRequestForUser(type: WithdrawalTypeEnum) {
    const { data } = await $fetch<{ data: WithdrawalDto[] }>(
      `${this.geUrl()}/pending-request/user/${type}`,
      {
        method: "POST",
      }
    );

    return data;
  }

  private static geUrl(): string {
    const { $runtimeConfig } = useNuxtApp() as any;
    return (
      $runtimeConfig.public.api.baseUrl +
      $runtimeConfig.public.api.withdrawal.url
    );
  }
}
