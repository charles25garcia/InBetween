
<script lang="ts" setup>
defineProps({
  showInModal: {
    type: Boolean,
    required: true,
  },
  showMechanics: {
    type: Boolean,
    required: true,
  },
});

const emit = defineEmits(["update:showMechanics", "close-modal"]);

const handleInput = (event: Event) => {
  const target = event.target as HTMLInputElement;
  const value = target.checked;

  emit("update:showMechanics", value);
};
</script>

<template>
  <div class="relative">
    <button
      v-if="showInModal"
      @click="emit('close-modal')"
      class="absolute -top-5 -right-5 px-1.5 py-0.5 bg-red-500 text-white rounded text-xs"
    >
      X
    </button>
    <h1 class="text-center">Hello Mechanics</h1>

    <div class="flex items-center mt-4" v-if="showInModal">
      <input
        @change="handleInput"
        type="checkbox"
        id="hideModalCheckbox"
        class="mr-2"
        :checked="showMechanics"
      />
      <label for="hideModalCheckbox" class="text-gray-300"
        >Don't show it again</label
      >
    </div>
  </div>
</template>
