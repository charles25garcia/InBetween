<script lang="ts" setup>
import { FieldTypeEnum } from "~/@shared/enums";
import { FieldClassModel, OutputPropsModel } from "~/@shared/models";

const { checkbox } = defineProps<{
  checkbox: FieldClassModel;
}>();

const emit = defineEmits(["changeCheckbox"]);

const checboxValue = ref(false);

watch(checkbox.value, () => {
  // checkbox.setValue(checboxValue.value);
  emit("changeCheckbox", {
    id: checkbox.id,
    value: checkbox.getValue(),
    valid: true,
  } as OutputPropsModel);
});
</script>

<template>
  <common-field-holder
    :class="'!mt-0'"
    :error-message="checkbox?.state?.value.message"
    :show-error-message="!checkbox.state?.value.valid"
  >
    <div class="flex items-center">
      <input
        id="default-checkbox"
        :type="FieldTypeEnum.Checkbox"
        v-model="checkbox.value.value"
        class="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
      />
      <label
        for="default-checkbox"
        class="ml-2 text-sm font-medium text-gray-400 dark:text-gray-300"
        >{{ checkbox.displayName }}</label
      >
    </div>
  </common-field-holder>
</template>
