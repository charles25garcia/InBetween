<script lang="ts" setup>
import { BetTypeEnum } from "~/@core/enums";
import { BetSelectorModel } from "~/@shared/models";
import { useGameStore } from "~/stores/useGameStore";

const gameStore = useGameStore();

const pointsBet = computed(() => gameStore.stats.bets?.points);

function onBetSubmit(data: BetSelectorModel) {
  gameStore.setPointsBet(data.inBetween, BetTypeEnum.InBetween);
  gameStore.setPointsBet(data.outBeyond, BetTypeEnum.OutBeyond);
  gameStore.setPointsBet(data.pair, BetTypeEnum.Pairs, 2);
  gameStore.setPointsBet(data.trio, BetTypeEnum.Trio, 3);

  gameStore.lockPoints();
}
</script>
<template>
  <game-bet-selector
    :title="gameStore.stats.points > 1 ? 'Points' : 'Point'"
    :betLocked="
      gameStore.stats?.pointsLocked ? gameStore.stats.pointsLocked : false
    "
    :amount="gameStore.stats.points || 0"
    @submitBet="onBetSubmit"
    :bets="pointsBet"
  ></game-bet-selector>
  <!-- <game-deck-result
    :result="gameStore.betPointsResult"
    title="points"
    class="mt-10 text-center"
  ></game-deck-result> -->
</template>
