<script lang="ts" setup>
defineProps<{
  dealOpen: boolean;
}>();
</script>

<template>
  <div class="relative">
    <div class="absolute z-10 w-full top-1/2 left-0 bg-slate-800 opacity-90">
      <h1 class="text-center text-5xl">
        {{ dealOpen ? "Deal Open" : "Deal Closed" }}
      </h1>
    </div>
    <div class="grid grid-cols-3 gap-2">
      <game-cover-card></game-cover-card>
      <game-cover-card></game-cover-card>
      <game-cover-card></game-cover-card>
    </div>
  </div>
</template>
