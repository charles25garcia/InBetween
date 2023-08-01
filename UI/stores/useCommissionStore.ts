import { defineStore } from "pinia";
import { CommissionHistoryDto, EndpointResponseDto } from "~/@core/dtos";
import { CommissionHistoryHttp } from "~/@core/https";

export const useCommissionStore = defineStore("commission", () => {
  const getCommission = async (userDetails: CommissionHistoryDto) => {
    const { data } = (await CommissionHistoryHttp.getCommissions(
      userDetails
    )) as EndpointResponseDto;

    return data;
  };

  return { getCommission };
});
