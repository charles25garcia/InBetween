<script lang="ts" setup>
defineProps<{
  count: number;
  title: string;
  description?: string;
}>();
</script>

<template>
  <div
    class="card-container w-full max-w-sm p-4 bg-white border border-gray-200 rounded-lg shadow sm:p-8 mb-10"
  >
    <div class="head text-center text-white h-40">
      <h1 class="mb-4 font-extrabold leading-none tracking-tight text-white">
        {{ count }}
      </h1>
    </div>
    <div class="title text-center text-gray-900">
      <h1 class="mb-4 font-extrabold leading-none tracking-tight">
        {{ title }}
      </h1>
      <h5 class="text-sm text-white">{{ description }}</h5>
    </div>
  </div>
</template>

<style lang="sass" scoped>
@import "@/assets/sass/global-variable-colors"
.card-container
  background-color: #5c5852
  border-color: $global-border-color
  &:hover
    background-color: #4e4e4e
  .head
    h1
      font-size: 6rem
  .title
    font-size: 2rem
</style>
