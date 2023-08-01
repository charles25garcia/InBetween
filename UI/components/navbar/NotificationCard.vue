<script lang="ts" setup>
defineProps<{
  notificationCount: number;
}>();
</script>

<template>
  <div class="notification-card theme-border-color ml-2 grid h-48 place-items-center">
    <div class="flex relative">
      <font-awesome-icon :icon="['fass', 'bell']" />
      <p class="absolute left-4 top-[-6px] -m-1">
        {{ notificationCount > 99 ? "99+" : notificationCount }}
      </p>
    </div>
  </div>
</template>

<style lang="sass" scoped>
@import "@/assets/sass/global-variable-colors"
.notification-card
  width: 40px
  height: 40px
  border: 1px solid
  border-radius: 6px
  cursor: pointer
  color: $global-border-color !important
  &:hover
    border-color: $global-hovered-border-color
    color: $global-hovered-border-color
  p
    width: 14px
    height: 14px
    background-color: red
    font-size: 10px
    border-radius: 50%
    font-weight: bold
    text-align: center
    color: white
</style>
