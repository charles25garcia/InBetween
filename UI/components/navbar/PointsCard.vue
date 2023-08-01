<script lang="ts" setup>
defineProps<{
  points: number;
}>();
</script>

<template>
  <div class="points-container grid h-48 place-items-center text-xs">
    <div>
      <p :style="{ fontSize: points > 999 ? '8px' : '12px' }">
        {{ StringLimiter(points.toString(), 4) }}
      </p>
      <!-- {{ points > 1 ? "points" : "point" }} -->
    </div>
  </div>
</template>

<style lang="sass" scoped>
@import "@/assets/sass/global-variable-colors"
.points-container
  width: 40px
  height: 40px
  border: 1px solid $global-border-color
  border-radius: 6px
  cursor: pointer
  &:hover
    border-color: $global-hovered-border-color
    div:first-child
      background-color: $global-hovered-border-color
  div
    background-color: $global-border-color
    width: 85%
    height: 85%
    border-radius: 50%
    font-size: 12px
    font-weight: bold
    text-align: center
    color: white
    padding: 4px
</style>
"]
