<script lang="ts" setup>
import { DeckResultsModel } from "~/@core/models";

const props = defineProps<{
  results: DeckResultsModel[];
}>();

const earnings = computed(() => props.results.filter((i) => i.prizeAmount > 0));
const losses = computed(() => props.results.filter((i) => i.lostAmount > 0));
</script>
<template>
  <div :class="earnings.length > 0 && losses.length > 0 ? 'grid grid-cols-2 gap-2': 'text-center'" class="overflow-y-auto max-h-16 results-container text-white w-full" v-if="results?.length > 0">
    <div class="earnings" v-if="earnings.length > 0">
      <h1 class="text-sm">Your Earnings:</h1>
      <h1 v-for="earning in earnings" :key="earning.title" class="text-lime-600 text-xs">
        {{ earning.prizeAmount }} {{ earning.title }}
      </h1>
    </div>

    <div class="losses" v-if="losses.length > 0">
      <h1 class="text-sm">Your Losses:</h1>
      <h1 v-for="loss in losses" :key="loss.title" class="!text-orange-600 text-xs">
        {{ loss.lostAmount }} {{ loss.title }}
      </h1>
    </div>
  </div>
</template>
