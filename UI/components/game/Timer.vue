<script setup lang="ts">
import { DeckModeEnum } from "~/@core/enums";
import { useGameStore } from "~/stores/useGameStore";

const gameStore = useGameStore();

const duration = computed(() => {
  switch (gameStore.deck.mode) {
    case DeckModeEnum.Shuffle:
    case DeckModeEnum.DealClosed:
    case DeckModeEnum.OpenFirstCard:
    case DeckModeEnum.OpenSecondCard:
    case DeckModeEnum.OpenThirdCard:
      return 5;
    case DeckModeEnum.DealOpen:
      return 30;
    case DeckModeEnum.Result:
      return 10;
    default:
      return 5;
  }
});

const progress = computed(() => 1 - gameStore.countDown / duration.value);
const radius = 22;
const circumference = 2 * Math.PI * radius;
const progressOffset = computed(() => circumference * progress.value);
</script>

<template>
  <div class="flex flex-col items-center justify-center h-full">
    <div class="relative circle-size">
      <div class="absolute inset-0 flex flex-col items-center justify-center">
        <div class="text-xl text-white font-bold z-10">
          {{ gameStore.countDown }}s
        </div>
      </div>
      <div
        class="absolute inset-0 rounded-full bg-transparent flex items-center justify-center border-8 border-yellow-500"
      >
        <svg class="w-full h-full">
          <circle
            class="stroke-current text-yellow-500 z-10"
            :stroke-dasharray="circumference"
            :stroke-dashoffset="progressOffset"
            :r="radius"
            cx="50%"
            cy="50%"
          />
        </svg>
      </div>
    </div>
  </div>
</template>

<style lang="sass" scoped>
.stroke-current
  stroke-width: 6
  fill: none
  transition: stroke-dashoffset 1s linear

.circle-size
  width: 4rem
  height: 4rem
</style>
