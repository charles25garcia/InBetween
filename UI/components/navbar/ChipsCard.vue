<script lang="ts" setup>
defineProps<{
  chips: number;
}>();
</script>
<template>
  <div class="chips-container relative text-center h-50 w-12">
    <h1
      class="font-bold chips-label"
      :style="{ fontSize: chips > 999 ? '10px' : '12px' }"
    >
      {{ StringLimiter(chips.toString(), 4) }}
    </h1>
  </div>
</template>
<style lang="sass" scoped>

.chips-container
    background-image: url("/assets/images/inbetween-chip-icon.png")
    background-repeat: no-repeat
    background-size: cover
    background-position: center center
    padding-top: 4%
</style>
