<script lang="ts" setup>
defineProps<{
  confirmationMessage: String;
}>();

const emit = defineEmits(["confirm", "cancel"]);

const confirm = () => {
  emit("confirm");
};

const cancel = () => {
  emit("cancel");
};
</script>

<template>
  <div class="fixed inset-0 flex items-center justify-center z-50">
    <div
      class="common-bg p-6 rounded shadow shadow-yellow-500 border theme-border-color"
    >
      <h3 class="text-lg font-semibold mb-4">{{ confirmationMessage }}</h3>
      <slot name="modal-body"></slot>
      <div class="flex justify-end">
        <button
          @click="cancel"
          type="button"
          class="mr-2 px-4 py-2 text-sm font-medium text-gray-600 bg-gray-100 rounded hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500"
        >
          Cancel
        </button>
        <button
          @click="confirm"
          type="button"
          class="px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
        >
          Confirm
        </button>
      </div>
    </div>
  </div>
</template>

<style scoped>
.common-bg {
  background-color: #1d1d1d;
}
</style>
