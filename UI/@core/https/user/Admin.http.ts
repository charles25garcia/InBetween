import {
  AuditLogsDto,
  CreatePlatinumUserDto,
  UpdateWithdrawalDto,
  UserDto,
  WithdrawalDto,
} from "~/@core/dtos";
import { WithdrawalTypeEnum } from "~/@core/enums";
import {
  AddStatsParamModel,
  ManualWithdrawalRequestModel,
} from "~/@core/models";

export class AdminHttp {
  static async getUsers() {
    const { data } = await $fetch<{ data: UserDto[] }>(
      `${this.getAdminUserUrl()}`,
      {
        method: "GET",
      }
    );

    return data;
  }

  static registerPlatinum(platinumDto: CreatePlatinumUserDto) {
    return $fetch(`${this.getAdminUserUrl()}/create-platinum-user`, {
      method: "POST",
      body: platinumDto,
      headers: {
        "Content-Type": "application/json",
      },
    });
  }

  static addStats(addStatsData: AddStatsParamModel) {
    return $fetch(`${this.getAdminUserUrl()}/add-stats`, {
      method: "PUT",
      body: addStatsData,
      headers: {
        "Content-Type": "application/json",
      },
    });
  }

  static async manualWithdrawal(withdrawal: ManualWithdrawalRequestModel) {
    const { data } = await $fetch<{ data: UserDto[] }>(
      `${this.getAdminUserUrl()}/manual-withdrawal`,
      {
        method: "PUT",
        body: withdrawal,
      }
    );

    return data;
  }

  static async getAuditLogs() {
    const { data } = await $fetch<{ data: AuditLogsDto[] }>(
      `${this.getAdminUserUrl()}/audit-logs`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    return data;
  }

  static async getPendingWithdrawals(type: WithdrawalTypeEnum) {
    const { data } = await $fetch<{ data: WithdrawalDto[] }>(
      `${this.getAdminUserUrl()}/pending-withdrawals/${type}`,
      {
        method: "POST",
      }
    );

    return data;
  }

  static approveWithdrawalRequest(updateWithdrawalDto: UpdateWithdrawalDto) {
    return $fetch(`${this.getAdminUserUrl()}/approve-withdrawal-request`, {
      method: "PUT",
      body: updateWithdrawalDto,
    });
  }

  static declineWithdrawalRequest(
    updateWithdrawalDto: UpdateWithdrawalDto,
    type: WithdrawalTypeEnum
  ) {
    return $fetch(
      `${this.getAdminUserUrl()}/decline-withdrawal-request/${type}`,
      {
        method: "PUT",
        body: updateWithdrawalDto,
      }
    );
  }

  private static getAdminUserUrl(): string {
    const { $runtimeConfig } = useNuxtApp() as any;
    return (
      $runtimeConfig.public.api.baseUrl +
      $runtimeConfig.public.api.adminUser.url
    );
  }
}
