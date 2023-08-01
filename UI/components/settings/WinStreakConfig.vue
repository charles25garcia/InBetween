<script lang="ts" setup>
import { WinstreakBonusDto } from "~/@core/dtos";
import { OutputPropsModel } from "~/@shared/models";
import { FieldTypeEnum } from "~/@shared/enums";
import { useSettingsStore } from "~/stores";

const { winStreakConfig } = defineProps<{
  winStreakConfig: WinstreakBonusDto;
}>();

const settingStore = useSettingsStore();
const winstreakConfigurationInput = ref(winStreakConfig);
const isLoading = ref(false);
const openConfirmation = ref(false);

function inputChange(output: OutputPropsModel, fieldName: string) {
  winstreakConfigurationInput.value = {
    ...winstreakConfigurationInput.value,
    [fieldName]: output.value,
  };
}

async function handleSave() {
  isLoading.value = true;
  await settingStore.updateWinStreakConfigs([
    winstreakConfigurationInput.value,
  ]);

//   winstreakConfigurationInput.value = {
//     ...winstreakConfigurationInput.value,
//     bonusPercent: 0,
//     winStreak: 0,
//   };
  isLoading.value = false;
}

async function handleDelete() {
  openConfirmation.value = !openConfirmation.value;
}

async function submitDelete() {
  isLoading.value = true;
  await settingStore.deleteWinStreakConfigs([
    winstreakConfigurationInput.value.id,
  ]);
  isLoading.value = false;
}
</script>

<template>
  <common-input-field
    :inputField="
      useInputField({
        id: `${winStreakConfig.id.toString()}-winStreakCount`,
        displayName: 'Win Streak Count',
        type: FieldTypeEnum.Number,
        required: true,
        value: winStreakConfig.winStreak,
      })
    "
    @change-input="inputChange($event, 'winStreak')"
  ></common-input-field>
  <common-input-field
    :inputField="
      useInputField({
        id: `${winStreakConfig.id.toString()}-bonusPercent`,
        displayName: 'Bonus Percent',
        type: FieldTypeEnum.Number,
        required: true,
        value: winStreakConfig.bonusPercent,
      })
    "
    @change-input="inputChange($event, 'bonusPercent')"
  ></common-input-field>
  <button
    @click="handleSave"
    :disabled="isLoading || openConfirmation"
    class="mt-6 theme-submit-button theme-container w-full text-teal-600"
  >
    <common-spinner v-if="isLoading"></common-spinner>
    <font-awesome-icon v-else :icon="['fass', 'check']" />
  </button>
  <div v-if="openConfirmation" class="grid grid-cols-2">
    <button
      class="mt-6 theme-submit-button theme-container w-full text-teal-600"
      @click="submitDelete"
    >
      <font-awesome-icon :icon="['fass', 'check']" />
    </button>
    <button
      class="mt-6 theme-submit-button theme-container w-full text-red-900"
      @click="handleDelete"
    >
      <font-awesome-icon :icon="['fass', 'xmark']" />
    </button>
  </div>
  <button
    v-else
    class="mt-6 theme-submit-button theme-container w-full text-red-900"
    :disabled="isLoading"
    @click="handleDelete"
  >
    <common-spinner v-if="isLoading"></common-spinner>
    <font-awesome-icon v-else :icon="['fass', 'xmark']" />
  </button>
</template>
