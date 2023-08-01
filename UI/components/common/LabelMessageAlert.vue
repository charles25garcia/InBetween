<script lang="ts" setup>
const emit = defineEmits(["onStateChange"]);

const props = defineProps<{
  message: string;
  show: boolean;
  type?: "error" | "success";
  duration?: number;
}>();

const showError = ref<boolean>(false);

watch(
  () => props.show,
  () => {
    showError.value = props.show;

    if (props.show) {
      setTimeout(() => {
        showError.value = false;
        emit("onStateChange", false);
      }, props.duration || 3000);
    }
  }
);
</script>
<template>
  <p
    v-show="showError"
    :class="type === 'error' ? 'text-red-400' : 'text-green-400'"
    class="text-sm h-fit text-center mt-3"
  >
    {{ message }}
  </p>
</template>
