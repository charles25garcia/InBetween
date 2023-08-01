<script lang="ts" setup>
import { BetTypeEnum } from "~/@core/enums";
import { BetSelectorModel } from "~/@shared/models";
import { useGameStore } from "~/stores/useGameStore";

const gameStore = useGameStore();
const chipsBet = computed(() => gameStore.stats.bets?.chips);

async function onBetSubmit(data: BetSelectorModel) {
  gameStore.setChipsBet(data.inBetween, BetTypeEnum.InBetween);
  gameStore.setChipsBet(data.outBeyond, BetTypeEnum.OutBeyond);
  gameStore.setChipsBet(data.pair, BetTypeEnum.Pairs);
  gameStore.setChipsBet(data.trio, BetTypeEnum.Trio);

  await gameStore.lockChips();
}
</script>
<template>
  <game-bet-selector
    :title="gameStore.stats.chips > 1 ? 'Chips' : 'Chip'"
    :amount="gameStore.stats.chips || 0"
    :betLocked="
      gameStore.stats?.chipsLocked ? gameStore.stats.chipsLocked : false
    "
    :bets="chipsBet"
    @submitBet="onBetSubmit"
  ></game-bet-selector>
  <!-- <game-deck-result
    :result="gameStore.betChipsResult"
    title="chips"
    class="mt-10 text-center"
  ></game-deck-result> -->
</template>
