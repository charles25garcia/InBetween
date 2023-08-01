<script lang="ts" setup>
import { DeckResultModel } from "~/@core/models";

defineProps<{
  result: DeckResultModel | undefined;
  title: string;
}>();
</script>
<template>
  <h1 v-if="result">
    You earned {{ result.prizeAmount }} and
    lost {{ result.lostAmount }} {{ title }}!
  </h1>
</template>
