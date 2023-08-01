<script lang="ts" setup>
const {} = defineProps<{
  errorMessage?: string;
  showErrorMessage?: boolean;
}>();
</script>

<template>
  <div class="mt-6">
    <slot />

    <p v-if="showErrorMessage" class="text-sm text-red-400 h-fit">
      {{ errorMessage }}
    </p>
  </div>
</template>
