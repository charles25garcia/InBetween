<script lang="ts" setup>
const props = defineProps({
  showModal: {
    type: Boolean,
    required: true,
  },
});

const emit = defineEmits(["closeModal"]);

function close() {
  emit("closeModal");
}
</script>

<template>
  <div
    v-if="showModal"
    class="fixed inset-0 flex items-center justify-center z-50 bg-opacity-50 bg-gray-900 backdrop-filter backdrop-blur-lg"
  >
    <div
      class="theme-form-bg p-8 rounded-lg shadow-xl border theme-border-color relative"
    >
      <button
        class="absolute text-white rounded text-xs rose-900 top-2 right-1 px-1.5 py-0.5"
        @click="close"
      >
        <font-awesome-icon :icon="['fass', 'rectangle-xmark']" />
      </button>
      <slot></slot>
    </div>
  </div>
</template>

<style lang="sass" scoped>
.rose-900
  color: #881337
  &:hover
    color: #a95a72
</style>
