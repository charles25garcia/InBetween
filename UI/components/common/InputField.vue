<script lang="ts" setup>
import { OutputPropsModel, FieldClassModel } from "~/@shared/models";

const { inputField } = defineProps<{
  inputField: FieldClassModel;
}>();
const emit = defineEmits(["changeInput"]);

// watch(
//   () => inputField.value.value,
//   () => {
//     inputField?.validate();
//     emit("changeInput", {
//       id: inputField.id,
//       value: inputField.getValue(),
//       valid: inputField.state.value.valid,
//     } as OutputPropsModel);
//   }
// );

function handleInputChange(event: any) {
  const target = event.target as HTMLInputElement;
  inputField.setValue(target.value);

  inputField?.validate();
  emit("changeInput", {
    id: inputField.id,
    value: inputField.getValue(),
    valid: inputField.state.value.valid,
  } as OutputPropsModel);
}

function limiter(event: any) {
  const target = event.target as HTMLInputElement;

  if (inputField.maxLength && inputField.maxLength < target.value.length) {
    target.value = target.value.substring(0, target.value.length - 1);
    return;
  }
}
</script>

<template>
  <common-field-holder
    :error-message="inputField.state.value?.message"
    :show-error-message="!inputField.state.value?.valid"
  >
    <div class="relative">
      <input
        :class="[
          !inputField.state.value?.valid
            ? 'border-red-400'
            : 'theme-border-color',
          { 'cursor-not-allowed': inputField.disabled },
        ]"
        :type="inputField.type"
        :id="inputField.id || inputField.displayName.trim()"
        class="block p-2 w-full text-sm bg-transparent rounded-s border appearance-none dark:text-white dark:focus:theme-border-color focus:outline-none focus:ring-0 focus:theme-border-color peer"
        placeholder=" "
        @keypress="limiter"
        @change="handleInputChange"
        :value="inputField.value.value"
        :min="inputField.type === 'number' ? 0 : undefined"
        :max="inputField.type === 'number' ? inputField.max : undefined"
        :required="inputField.required"
        :disabled="inputField.disabled"
        :maxlength="inputField.maxLength"
      />
      <label
        :for="inputField.id || inputField.displayName.trim()"
        class="absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-4 common-bg scale-75 top-2 z-10 origin-[0] dark:bg-gray-900 px-2 peer-focus:px-2 peer-focus:text-gray-600 peer-focus:dark:text-gray-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-4 left-1"
        >{{ inputField.displayName }}</label
      >
    </div>
  </common-field-holder>
</template>

<style scoped lang="sass">
.common-bg
  background-color: #1d1d1d
</style>
