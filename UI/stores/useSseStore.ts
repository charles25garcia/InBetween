import { defineStore } from "pinia";
import { DeckSse } from "~/@core/https";
import { useGameStore } from "./useGameStore";
import { SseTypeEnum } from "~/@shared/enums";

export const useSseStore = defineStore("sse", () => {
  const gameStore = useGameStore();
  let mainSse$: EventSource;

  function closeEventSource() {
    mainSse$.close();
  }
  function listenToMainSse() {
    mainSse$ = DeckSse.mainSse(gameStore.userId);

    mainSse$.onmessage = ({ data }) => {
      const mainSseData = JSON.parse(data);
      switch (mainSseData.type) {
        case SseTypeEnum.Countdown:
          gameStore.countDown = mainSseData.data;
          break;
        case SseTypeEnum.Deck:
          gameStore.deck = mainSseData.data;
          break;
        case SseTypeEnum.UserStats:
          gameStore.stats = {
            ...gameStore.stats,
            ...mainSseData.data,
            winStreakCount:
              mainSseData.data.winstreakCount !== undefined
                ? mainSseData.data.winstreakCount
                : gameStore.stats.winStreakCount,
          };
          break;
        case SseTypeEnum.PotBonusData:
          gameStore.potBonusData = {
            winstreakBonuses: mainSseData.data.potBonusData,
            numberOfWinners: mainSseData.data.numberOfWinners,
          };
          break;
        case SseTypeEnum.BetLockData:
          gameStore.setChipsBetLockedData(mainSseData.data);
          break;

        case SseTypeEnum.GameHistory:
          gameStore.gameHistory = mainSseData.data;

          break;
        default:
          break;
      }
    };
  }

  async function startDeck(): Promise<void> {
    listenToMainSse();
    await gameStore.updateStats();
    await gameStore.updateDeckData();
    await gameStore.updatePotBonusData();
  }

  return {
    startDeck,
    listenToMainSse,
    closeEventSource,
  };
});
