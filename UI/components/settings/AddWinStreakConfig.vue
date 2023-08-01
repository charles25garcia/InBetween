<script lang="ts" setup>
import { WinstreakBonusDto } from "~/@core/dtos";
import { OutputPropsModel } from "~/@shared/models";
import { FieldTypeEnum } from "~/@shared/enums";
import { useSettingsStore } from "~/stores";

const settingStore = useSettingsStore();
const isLoading = ref(false);

const bonusPercent = ref(0);
const winStreak = ref(0);

async function handleSave() {
  isLoading.value = true;
  await settingStore.addWinStreakConfig({
    id: 0,
    potBonusAmount: 0,
    bonusPercent: bonusPercent.value,
    winStreak: winStreak.value,
  });
  bonusPercent.value = 0;
  winStreak.value = 0;

  isLoading.value = false;
}

function inputChangeWinStreakCount(output: OutputPropsModel) {
  winStreak.value = output.value;
}

function inputChangeBonusPercent(output: OutputPropsModel) {
  bonusPercent.value = +output.value;
}
</script>

<template>
  <common-input-field
    :inputField="
      useInputField({
        displayName: 'Win Streak Count',
        type: FieldTypeEnum.Number,
        required: true,
        value: winStreak,
      })
    "
    @change-input="inputChangeWinStreakCount"
  ></common-input-field>
  <common-input-field
    :inputField="
      useInputField({
        displayName: 'Bonus Percent',
        type: FieldTypeEnum.Number,
        required: true,
        value: bonusPercent,
      })
    "
    @change-input="inputChangeBonusPercent"
  ></common-input-field>
  <button
    @click.prevent="handleSave"
    :disabled="isLoading || bonusPercent < 1 || winStreak < 1"
    class="mt-6 theme-submit-button theme-container w-full text-teal-600 col-span-2"
  >
    <common-spinner v-if="isLoading"></common-spinner>
    <h2 v-else>Add new</h2>
  </button>
</template>
