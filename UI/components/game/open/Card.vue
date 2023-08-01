<script lang="ts" setup>
defineProps<{
  imageUrl: string;
}>();
</script>

<template>
  <div
    class="casino-card w-fit shadow-sm hover:shadow-md hover:shadow-yellow-400 cursor-pointer"
  >
    <img :src="imageUrl" alt="" />
  </div>
</template>

<style lang="sass" scoped>
@import "@/assets/sass/global-variable-colors"

.casino-card
    background-color: transparent
    height: 24rem
    border-radius: 20px
    img
        height: 100%
</style>
