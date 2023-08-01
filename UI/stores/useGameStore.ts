import { defineStore } from "pinia";
import {
  BetModel,
  DeckConfigModel,
  EasypickModel,
  DeckResultModel,
} from "~/@core/models";

import { GameHttp, GameHistoryHttp } from "~/@core/https";
import { BetTypeEnum, DeckModeEnum } from "~/@core/enums";
import {
  StatsDto,
  WinstreakBonusSseDto,
  EndpointResponseDto,
  UserBetLockedDto,
} from "~/@core/dtos";
import { useProfileStore } from "./useProfileStore";

import { Howl } from "howler";
import bgMusicFile from "@/assets/sounds/background-music.mp3";
import shuffleSFXFile from "@/assets/sounds/card-shuffle.mp3";
import cardFlipSFXFile from "@/assets/sounds/card-flip.mp3";
import placeBetSFXFile from "@/assets/sounds/place-your-bets.mp3";
import countDownSFXFile from "@/assets/sounds/count-down.mp3";
import winSFXFile from "@/assets/sounds/win.wav";
import loseSFXFile from "@/assets/sounds/lose.wav";
import dealChipsSFXFile from "@/assets/sounds/deal-chips.mp3";
import { useDealHistoryStore } from "./useDealHistoryStore";

export const useGameStore = defineStore("game", () => {
  const bgMusic = ref();
  const shuffleSFX = ref();
  const cardFlipSFX = ref();
  const placeBetSFX = ref();
  const countDownSFX = ref();
  const winSFX = ref();
  const loseSFX = ref();
  const dealChipsSFX = ref();

  const isBGMMuted = ref(true);
  const isSFXMuted = ref(true);

  const countDown = ref(0);

  const profileStore = useProfileStore();
  const dealHistoryStore = useDealHistoryStore();

  const userId = computed(() => profileStore.userProfile?.id);

  const route = useRoute();

  const stats = ref<StatsDto>({
    chips: 0,
    points: 0,
    winStreakCount: 0,
    pointsLocked: true,
    chipsLocked: true,
  });
  const betPointsResult = ref<DeckResultModel>();
  const betChipsResult = ref<DeckResultModel>();
  const potBonusData = ref<WinstreakBonusSseDto>({
    winstreakBonuses: [],
    numberOfWinners: 0,
  });

  const selectedPointBets = ref<BetModel[]>([]);
  const selectedChipBets = ref<BetModel[]>([]);
  const chipsBetLockedData = ref<UserBetLockedDto[]>([]);

  const gameHistory = ref([]);

  const deck: globalThis.Ref<DeckConfigModel> = ref({
    mode: DeckModeEnum.Loading,
    timer: 0,
    cardsOnDeck: [],
    dealNumber: 0,
  });

  const easyPickOptions = ref<EasypickModel[]>([]);

  onMounted(async () => {
    easyPickOptions.value = await GameHttp.getEasyPick();

    bgMusic.value = new Howl({
      src: bgMusicFile,
      loop: true,
      volume: 0.2,
      mute: true,
    });

    shuffleSFX.value = new Howl({
      src: shuffleSFXFile,
      volume: 3,
      duration: 5,
      mute: true,
    });

    cardFlipSFX.value = new Howl({
      src: cardFlipSFXFile,
      volume: 5,
      mute: true,
    });

    placeBetSFX.value = new Howl({
      src: placeBetSFXFile,
      volume: 1,
      mute: true,
    });

    countDownSFX.value = new Howl({
      src: countDownSFXFile,
      volume: 5,
      mute: true,
    });

    winSFX.value = new Howl({
      src: winSFXFile,
      volume: 2,
      mute: true,
    });

    loseSFX.value = new Howl({
      src: loseSFXFile,
      volume: 2,
      mute: true,
    });
  });

  watch(route, () => {
    if (route.path !== "/game") {
      muteAllSounds();
    }
  });

  watch(deck, async (curr, old) => {
    switch (curr.mode) {
      case DeckModeEnum.Result:
        if (selectedPointBets.value.length > 0 && old.mode !== curr.mode) {
          await pointsResultWorker();
        }

        if (selectedChipBets.value.length > 0 && old.mode !== curr.mode) {
          await chipsResultWorker();
        }

        if (betChipsResult.value) {
          if (
            betChipsResult.value?.isWinner ||
            betPointsResult.value?.isWinner
          ) {
            if (!winSFX.value.playing()) {
              winSFX.value.play();
            }
          } else {
            if (!loseSFX.value.playing()) {
              loseSFX.value.play();
            }
          }
        }

        dealHistoryStore.loadDealHistories(profileStore.userProfile.id);
        break;
      case DeckModeEnum.Shuffle:
        if (old.mode === DeckModeEnum.Shuffle) {
          break;
        }
        betChipsResult.value = undefined;
        selectedChipBets.value = [];
        selectedPointBets.value = [];
        betPointsResult.value = undefined;
        chipsBetLockedData.value = [];
        stats.value = {
          ...stats.value,
          chipsLocked: false,
          pointsLocked: false,
        };

        if (!shuffleSFX.value.playing()) {
          shuffleSFX.value.play();
        }

        break;
      case DeckModeEnum.OpenFirstCard:
      case DeckModeEnum.OpenSecondCard:
      case DeckModeEnum.OpenThirdCard:
        if (!cardFlipSFX.value.playing()) {
          cardFlipSFX.value.play();
        }
        break;
      case DeckModeEnum.DealOpen:
        if (!placeBetSFX.value.playing()) {
          placeBetSFX.value.play();
        }
        break;

      default:
        break;
    }
  });

  watch(countDown, () => {
    if (deck.value.mode === 2 && countDown.value === 10) {
      if (!countDownSFX.value.playing()) {
        countDownSFX.value.play();
      }
    }
  });

  function initializeDealChipsSFX() {
    dealChipsSFX.value = new Howl({
      src: dealChipsSFXFile,
      volume: 5,
      mute: true,
    });
  }

  function toggleBGMMute() {
    isBGMMuted.value = !isBGMMuted.value;

    if (!bgMusic.value.playing()) {
      bgMusic.value.play();
    }

    bgMusic.value.mute(isBGMMuted.value);
  }

  function toggleSFXMute() {
    isSFXMuted.value = !isSFXMuted.value;

    shuffleSFX.value.mute(isSFXMuted.value);
    cardFlipSFX.value.mute(isSFXMuted.value);
    placeBetSFX.value.mute(isSFXMuted.value);
    countDownSFX.value.mute(isSFXMuted.value);
    winSFX.value.mute(isSFXMuted.value);
    loseSFX.value.mute(isSFXMuted.value);
    dealChipsSFX.value.mute(isSFXMuted.value);
  }

  function muteAllSounds() {
    shuffleSFX.value.mute(true);
    cardFlipSFX.value.mute(true);
    placeBetSFX.value.mute(true);
    countDownSFX.value.mute(true);
    winSFX.value.mute(true);
    loseSFX.value.mute(true);
    dealChipsSFX.value.mute(true);
    bgMusic.value.mute(true);
  }

  async function pointsResultWorker() {
    const validBets = selectedPointBets.value.filter((i) => i.amount > 0);

    if (validBets.length === 0) {
      return;
    }

    const { result } = await sendPointsToApi(validBets);

    // stats.value = {
    //   ...stats.value,
    //   winStreakCount,
    //   points,
    // };

    betPointsResult.value = result;
  }

  async function chipsResultWorker() {
    const validBets = selectedChipBets.value.filter((i) => i.amount > 0);

    if (validBets.length === 0) {
      return;
    }

    const { result } = await sendChipsToApi(validBets);

    // stats.value = {
    //   ...stats.value,
    //   winStreakCount,
    //   chips,
    // };

    betChipsResult.value = result;
  }

  async function updateDeckData() {
    const deckData = await GameHttp.getCurrentDeckData();
    deck.value = deckData;
  }

  async function updateStats() {
    stats.value = await GameHttp.getStats(userId.value);
    const chpis = stats.value.bets?.chips;

    if (chpis) {
      selectedChipBets.value = [
        {
          amount: chpis.inBetween,
          type: BetTypeEnum.InBetween,
        },
        {
          amount: chpis.outBeyond,
          type: BetTypeEnum.OutBeyond,
        },
        {
          amount: chpis.pair,
          type: BetTypeEnum.Pairs,
        },
        {
          amount: chpis.trio,
          type: BetTypeEnum.Trio,
        },
      ];
    }
  }

  async function updatePotBonusData() {
    potBonusData.value = await GameHttp.getCurrentPotBonusData();
  }

  async function getChipsBetLockedData() {
    const betLockedData = await GameHttp.getChipsBetLockedData();
    setChipsBetLockedData(betLockedData);
  }

  function sendPointsToApi(bets: BetModel[]) {
    return GameHttp.submitPointsBet(userId.value, bets);
  }

  function sendChipsToApi(bets: BetModel[]) {
    return GameHttp.submitChipsBet(userId.value, bets);
  }

  async function lockChips() {
    await GameHttp.lockChips(userId.value, selectedChipBets.value);
  }

  async function lockPoints() {
    await GameHttp.lockPoints(userId.value, selectedPointBets.value);
  }

  function setChipsBet(amount: number, betType: BetTypeEnum) {
    selectedChipBets.value.push({ amount, type: betType });
  }

  function setPointsBet(amount: number, betType: BetTypeEnum, multiplier = 0) {
    selectedPointBets.value.push({ amount, type: betType, multiplier });
  }

  async function getEasyPick() {
    return await GameHttp.getEasyPick();
  }

  async function getGameHistories() {
    const { data } =
      (await GameHistoryHttp.getHistories()) as EndpointResponseDto;

    gameHistory.value = data;
  }

  function setChipsBetLockedData(betLockedData: UserBetLockedDto[]) {
    const grandTotalChips = useNumberSummarizer(
      betLockedData.map((i) => i.totalAmount)
    );

    chipsBetLockedData.value = betLockedData.map((i) => {
      // const userTotalBetPerType =
      //   selectedChipBets.value.find(
      //     (bet) => bet.type === i.betType && bet.amount > 0
      //   )?.amount || 0;

      return {
        ...i,
        payoutRatio: PayoutRatioComputer(i.totalAmount, grandTotalChips) || 0,
      };
    });
  }

  return {
    dealChipsSFX,
    isSFXMuted,
    isBGMMuted,
    countDown,
    stats,
    deck,
    easyPickOptions,
    betChipsResult,
    betPointsResult,
    userId,
    potBonusData,
    chipsBetLockedData,
    gameHistory,
    setChipsBet,
    setPointsBet,
    getEasyPick,
    getGameHistories,
    updateStats,
    lockChips,
    lockPoints,
    updateDeckData,
    updatePotBonusData,
    getChipsBetLockedData,
    setChipsBetLockedData,
    toggleBGMMute,
    toggleSFXMute,
    initializeDealChipsSFX,
  };
});
