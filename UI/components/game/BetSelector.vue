<script setup lang="ts">
import { DeckModeEnum } from "~/@core/enums";
import { BetOptionsConst } from "~/@core/constants";
import { useGameStore } from "~/stores/useGameStore";
import { EasypickModel } from "~/@core/models";
import { MinimumBetConst } from "~/@shared/constants";
import { BetSelectorModel } from "~/@shared/models";

const props = defineProps<{
  title: string;
  amount: number;
  betLocked: boolean;
  bets?: BetSelectorModel;
}>();
const emit = defineEmits(["submitBet"]);

const gameStore = useGameStore();

const amount = reactive({
  inbetween: ref(0),
  pair: ref(0),
  trio: ref(0),
  outbeyond: ref(0),
}) as { [key: string]: number };

// Computed
const validAmount = computed(() => {
  return props.amount >= MinimumBetConst;
});
const totalBet = computed(
  () => amount.inbetween + amount.pair + amount.outbeyond + amount.trio
);
const remainingBetAmount = computed(() => props.amount - totalBet.value);

const allowBetting = ref(gameStore.deck.mode === DeckModeEnum.DealOpen);
// const betLocked = ref(false);

const selectedEasyPick = ref<EasypickModel>();
const updatedPoints = ref(props.amount || 0);

onMounted(() => {
  gameStore.initializeDealChipsSFX();
});

watch(
  () => props.bets,
  () => {
    if (props.bets) {
      amount.inbetween = props.bets.inBetween;
      amount.outbeyond = props.bets.outBeyond;
      amount.pair = props.bets.pair;
      amount.trio = props.bets.trio;
    }
  }
);

watch(
  () => gameStore.deck,
  (curr, prev) => {
    switch (curr.mode) {
      case DeckModeEnum.Shuffle:
        amount.inbetween = 0;
        amount.pair = 0;
        amount.trio = 0;
        amount.outbeyond = 0;
        selectedEasyPick.value = undefined;
        // betLocked.value = false;
        break;
      case DeckModeEnum.DealClosed:
        allowBetting.value = false;
      // handleSubmitBet();
      default:
        break;
    }

    if (curr.mode !== prev.mode) {
      allowBetting.value = gameStore.deck.mode === DeckModeEnum.DealOpen;
    }
  }
);

watch(
  () => props.amount,
  () => {
    updatedPoints.value = props.amount;
  }
);

const handleEasyPickOptionClick = (easyPick: EasypickModel): void => {
  if (easyPick?.id === selectedEasyPick.value?.id) {
    selectedEasyPick.value = undefined;
    return;
  }

  selectedEasyPick.value = easyPick;
};

const handleSubmitBet = () => {
  if (totalBet.value < MinimumBetConst) {
    return;
  }
  emit("submitBet", {
    inBetween: amount.inbetween,
    outBeyond: amount.outbeyond,
    pair: amount.pair,
    trio: amount.trio,
  });

  if (!gameStore.dealChipsSFX.playing()) {
    gameStore.dealChipsSFX.play();
  }

  updatedPoints.value = updatedPoints.value - totalBet.value;

  allowBetting.value = false;
  // betLocked.value = true;
};

const getIdValue = (betOption: string): string => {
  return `${props.title.toLowerCase()}-${betOption
    .toLowerCase()
    .replace(/\s/g, "")}`;
};

function updateInput(data: { value: number; betOption: string }) {
  amount[data.betOption] = data.value;
  selectedEasyPick.value = undefined;
}

function isInvalidBetOption(betOption: string) {
  return (
    remainingBetAmount.value + amount[betOption] < MinimumBetConst ||
    (totalBet.value >= props.amount && amount[betOption] < 1)
  );
}

function isInvalidEasyPick(value: number) {
  const percentValue = props.amount * value;

  return (
    remainingBetAmount.value <= percentValue &&
    remainingBetAmount.value !== percentValue
  );
}

function getBetMaxValue(betOption: string) {
  const betValue = amount[betOption];
  return totalBet.value > betValue
    ? remainingBetAmount.value + betValue
    : props.amount;
}
</script>

<template>
  <div
    class="flex flex-col justify-center items-center w-full mx-auto max-w-screen-lg"
  >
    <div
      class="flex justify-center items-center border-b theme-border-color w-full"
    >
      <h1 class="bet-header text-xl font-bold text-white">
        {{ updatedPoints || 0 }} {{ props.title }}
      </h1>
    </div>
    <div class="flex mt-5 items-start">
      <h1 class="font-bold text-white text-xs">Easy pick:</h1>
    </div>

    <div class="flex flex-wrap justify-center mt-2">
      <button
        class="theme-submit-button theme-container text-white text-xs py-1 px-3.5 rounded-xl border theme-border-color ml-2 first:ml-0"
        v-for="easyPickOption in gameStore.easyPickOptions"
        :key="easyPickOption.percentage"
        :class="{
          '!bg-yellow-500':
            easyPickOption.id === selectedEasyPick?.id && allowBetting,
          'cursor-not-allowed': !allowBetting,
        }"
        :value="easyPickOption.value"
        @click="handleEasyPickOptionClick(easyPickOption)"
        :disabled="isInvalidEasyPick(easyPickOption.value) || !allowBetting"
      >
        {{ easyPickOption.percentage }}
      </button>
    </div>

    <div class="grid grid-cols-2">
      <div
        class="items-center relative mt-5 pl-2"
        v-for="option in BetOptionsConst"
        :key="option.id"
      >
        <game-bet-selector-text-input
          v-if="props"
          :maximumValue="getBetMaxValue(option.id)"
          :disabledValue="
            !allowBetting || !validAmount || isInvalidBetOption(option.id)
          "
          :totalAmount="props.amount"
          :betOption="option.display"
          :idValue="option.id + '-' + props.title"
          :easyPick="selectedEasyPick"
          :locked="props.betLocked"
          :existingBet="amount[option.id]"
          @updateInput="updateInput"
        />
      </div>
    </div>
    <button
      class="theme-submit-button mt-4 theme-container w-full h-8 rounded-md"
      :class="betLocked && totalBet > 0 ? 'text-rose-600 font-bold' : ''"
      :disabled="!allowBetting || betLocked"
      @click="handleSubmitBet()"
    >
      Deal {{ betLocked ? " Locked" : "" }}
    </button>
  </div>
</template>

<style scoped lang="sass">
.common-bg
  background-color: #1d1d1d

@media (max-width: 968px)
  .bet-header
    font-size: 14px !important
</style>
