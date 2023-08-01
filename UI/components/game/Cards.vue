<script lang="ts" setup>
import { DeckModeEnum } from "~/@core/enums";
import { useGameStore } from "~/stores/useGameStore";
import { BetOptionsConst } from "~/@core/constants";

const gameStore = useGameStore();

const label = computed(
  () =>
    BetOptionsConst.find((i) => i.type === gameStore.deck.betResult)?.display
);
</script>
<template>
  <game-shuffle-cards
    v-if="gameStore.deck.mode === DeckModeEnum.Shuffle || !gameStore.deck"
  ></game-shuffle-cards>
  <game-cover-cards
    v-else-if="
      [DeckModeEnum.DealClosed, DeckModeEnum.DealOpen].includes(
        gameStore.deck.mode
      )
    "
    :deal-open="gameStore.deck.mode === DeckModeEnum.DealOpen"
  ></game-cover-cards>
  <game-open-cards
    v-else
    :cards-on-deck="gameStore.deck.cardsOnDeck"
    :is-result="gameStore.deck.mode === DeckModeEnum.Result"
    :label="label || ''"
  ></game-open-cards>
</template>

<style lang="sass" scoped>
.win-streak-bar
  background-color: #65a30d61
</style>
