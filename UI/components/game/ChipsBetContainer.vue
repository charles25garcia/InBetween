<script lang="ts" setup>
import { useGameStore } from "~/stores";
import { BetOptionsConst } from "~/@core/constants";
import { BetTypeEnum } from "~/@core/enums";
import { UserBetLockedDto } from "~/@core/dtos";

const gameStore = useGameStore();

const fixRatios: {
  betType: BetTypeEnum;
  fixRatio: number;
}[] = [
  {
    betType: BetTypeEnum.Pairs,
    fixRatio: 5,
  },
  {
    betType: BetTypeEnum.Trio,
    fixRatio: 15,
  },
];

const chipsBetLockedInitData: UserBetLockedDto[] = [
  {
    betType: BetTypeEnum.InBetween,
    totalAmount: 0,
    payoutRatio: 0,
  },
  {
    betType: BetTypeEnum.OutBeyond,
    totalAmount: 0,
    payoutRatio: 0,
  },
  {
    betType: BetTypeEnum.Pairs,
    totalAmount: 0,
    payoutRatio: 0,
  },
  {
    betType: BetTypeEnum.Trio,
    totalAmount: 0,
    payoutRatio: 0,
  },
];

function getDisplayName(type: BetTypeEnum) {
  return BetOptionsConst.find((i) => i.type === type)?.display || "";
}

function getFixRatio(type: BetTypeEnum) {
  return fixRatios.find((i) => i.betType === type)?.fixRatio;
}
</script>
<template>
  <div class="grid grid-cols-4">
    <div
      class="text-white"
      v-for="bet in gameStore.chipsBetLockedData.length
        ? gameStore.chipsBetLockedData
        : chipsBetLockedInitData"
      :key="bet.betType"
    >
      <h3>
        {{ getDisplayName(bet.betType) }}:
        {{ getFixRatio(bet.betType) || bet.payoutRatio }}
      </h3>
      <!-- <h3>Payout Ratio: </h3> -->
    </div>
  </div>
</template>
