<script lang="ts" setup>
defineProps({
  showModal: {
    type: Boolean,
    required: true,
  },
});
</script>

<template>
  <div
    v-if="showModal"
    class="fixed inset-0 flex items-center justify-center z-50 bg-opacity-50 bg-gray-900 backdrop-filter backdrop-blur-lg"
  >
    <div
      class="theme-background p-8 rounded-lg shadow-xl border theme-border-color"
    >
      <slot></slot>
    </div>
  </div>
</template>
