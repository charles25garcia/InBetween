<script lang="ts" setup>
import { DeckModeEnum } from "~/@core/enums";
import { useGameStore } from "~/stores/useGameStore";

const gameStore = useGameStore();
</script>

<template>
  <div
    :class="
      gameStore.deck.mode === DeckModeEnum.DealOpen
        ? 'cursor-pointer'
        : 'cursor-not-allowed'
    "
    class="casino-card w-fit shadow-sm hover:shadow-md hover:shadow-yellow-400"
  >
    <img src="@/assets/images/cards/card-face-down.svg" alt="" />
  </div>
</template>

<style lang="sass" scoped>
@import "@/assets/sass/global-variable-colors"

.casino-card
    background-color: transparent
    height: 24rem
    border-radius: 20px
    img
        height: 100%
</style>
