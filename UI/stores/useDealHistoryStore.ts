import { defineStore } from "pinia";
import { DealHistoryDto } from "~/@core/dtos";
import { DealHistoryHttp } from "~/@core/https";

export const useDealHistoryStore = defineStore("deal-history", () => {
  const chipsDealHistory = ref<DealHistoryDto[]>([]);
  const pointsDealHistory = ref<DealHistoryDto[]>([]);

  async function loadDealHistories(userId: string) {
    const dealHistories = await DealHistoryHttp.getDealHistoryByUserId(userId);

    chipsDealHistory.value = dealHistories.filter((i) => i.type === "chips");
    pointsDealHistory.value = dealHistories.filter((i) => i.type === "points");
  }

  return {
    chipsDealHistory,
    pointsDealHistory,
    loadDealHistories,
  };
});
