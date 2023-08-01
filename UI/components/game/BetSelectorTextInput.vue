<script lang="ts" setup>
import { BetOptionsConst } from "~/@core/constants";
import { DeckModeEnum } from "~/@core/enums";
import { EasypickModel } from "~/@core/models";
import { MinimumBetConst } from "~/@shared/constants";
import { useGameStore } from "~/stores/useGameStore";

const props = defineProps<{
  betOption: string;
  disabledValue: boolean;
  maximumValue: number;
  totalAmount: number;
  idValue: string;
  easyPick: EasypickModel | undefined;
  locked: boolean;
  existingBet?: number;
}>();

const gameStore = useGameStore();
const inputValue = ref("0");

watch(
  () => gameStore.deck,
  () => {
    switch (gameStore.deck.mode) {
      case DeckModeEnum.Shuffle:
        inputValue.value = "0";
        break;
      case DeckModeEnum.DealClosed:
        if (!props.locked) {
          inputValue.value = "0";
        }
        break;
      default:
        break;
    }
  }
);

watch(
  () => props.existingBet,
  () => (inputValue.value = props.existingBet?.toString() || "0")
);

const emit = defineEmits(["updateInput"]);
const handleInput = () => {
  inputValue.value =
    Number(inputValue.value) < 0 ? "0" : Number(inputValue.value).toString();
};

function applyEasyPick() {
  if (!props.easyPick) {
    return;
  }

  inputValue.value = Math.round(
    Number(+props.totalAmount * +props.easyPick.value)
  ).toString();

  emit("updateInput", {
    value: +inputValue.value,
    betOption: props.betOption.toLowerCase().replace(/\s/g, ""),
  });
}

function handleFocusOut() {
  const value = inputValue.value;
  if (+value < MinimumBetConst && +value > 0) {
    inputValue.value = MinimumBetConst.toString();
  } else if (props.maximumValue < +value) {
    inputValue.value = props.maximumValue.toString();
  }

  emit("updateInput", {
    value: +inputValue.value,
    betOption: props.betOption.toLowerCase().replace(/\s/g, ""),
  });
}
</script>

<template>
  <input
    :id="idValue"
    :class="{ 'cursor-not-allowed': disabledValue }"
    type="number"
    class="font-24 w-[90%] text-white p-2 text-sm bg-transparent theme-border-color rounded-s border appearance-none dark:text-white dark:focus:theme-border-color focus:outline-none focus:ring-0 focus:theme-border-color peer"
    v-model="inputValue"
    required
    @input="handleInput"
    :disabled="disabledValue"
    @focusin="applyEasyPick"
    @focusout="handleFocusOut()"
  />
  <label
    :for="idValue"
    class="bet-label absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-4 common-bg scale-75 top-2 z-10 origin-[0] dark:bg-gray-900 px-2 peer-focus:px-2 peer-focus:text-gray-600 peer-focus:dark:text-gray-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-4 left-1"
  >
    <label class="long-label">
      {{ betOption }}
    </label>
    <label class="short-label">
      {{ BetOptionsConst.find((i) => i.display === betOption)?.shortName }}
    </label>
  </label>
</template>

<style scoped lang="sass">
.common-bg
  background-color: #1d1d1d

.font-24
  font-size: 16px

.short-label
  display: none

@media (max-width: 968px)
  .long-label
    display: none
  .short-label
    display: block
</style>
