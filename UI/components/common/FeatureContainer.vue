<script lang="ts" setup>
defineProps<{
  title: string;
  description?: string;
}>();
</script>
<template>
  <div
    class="h-full settings-container place-items-center theme-form-bg px-8 theme-border-color border pt-6 pb-8 mb-4 text-white"
  >
    <h1 class="text-3xl text-center font-bold">{{ title }}</h1>
    <h1 class="text-sm text-center font-bold">{{ description }}</h1>

    <div class="h-[90%] overflow-y-auto">
      <slot />
    </div>
  </div>
</template>
