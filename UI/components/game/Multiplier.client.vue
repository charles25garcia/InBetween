<script lang="ts" setup>
import { useGameStore } from "~/stores/useGameStore";

const gameStore = useGameStore();

const barPercent = computed(() => {
  const percent = (gameStore.stats.winStreakCount || 0) * 4;

  if (percent + 5 > 99) {
    return 100;
  }

  if (percent === 0) {
    return 0;
  }

  return percent + 5;
});

const strWinCount = computed(() =>
  (gameStore.stats.winStreakCount || 0) > 0
    ? (gameStore.stats.winStreakCount || 0).toString()
    : ""
);
</script>

<template>
  <div class="relative">
    <div class="grid grid-cols-2">
      <h1>Win Streak: {{ strWinCount || 0 }}</h1>
      <h1 v-if="(gameStore.potBonusData.numberOfWinners || 0) > 0">
        Winners Count: {{ gameStore.potBonusData.numberOfWinners }}
      </h1>
    </div>

    <div
      :style="{ width: `${barPercent}%` }"
      class="winstreak-bar h-5 win-streak-bar text-center duration-300 absolute text-bold"
    ></div>
    <div class="grid grid-rows-2 gap-0">
      <div class="grid grid-cols-5 gap-0">
        <div></div>
        <h1
          v-for="winstreakBonus in gameStore.potBonusData.winstreakBonuses.sort(
            (a, b) => a.winStreak - b.winStreak
          )"
          :key="winstreakBonus.winStreak"
          :class="
            (gameStore.stats.winStreakCount || 0) >= winstreakBonus.winStreak
              ? 'text-yellow-400 font-bold'
              : ''
          "
        >
          {{ winstreakBonus.winStreak }}x
        </h1>
      </div>
      <div class="prizes px-2 grid grid-cols-5 gap-0">
        <div></div>
        <h1
          v-for="winstreakBonus in gameStore.potBonusData.winstreakBonuses"
          :key="winstreakBonus.winStreak"
        >
          Prize: {{ winstreakBonus.potBonusAmount }}
        </h1>
      </div>
    </div>
  </div>
</template>

<style lang="sass" scoped>
@import "@/assets/sass/global-variable-colors"

.prizes
    background-color: gray

.win-streak-bar
  background-color: #65a30d61
</style>
