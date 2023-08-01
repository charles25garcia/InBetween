<script lang="ts" setup>
import { useSettingsStore } from "~/stores";

const settingsStore = useSettingsStore();

onMounted(() => {
  settingsStore.updateWinstreakConfigData();
});
</script>
<template>
  <common-feature-container title="Game Settings">
    <div class="winstreak-setting">
      <h1 class="text-xl">Win Streak Configuration:</h1>

      <div v-if="(settingsStore.winStreakConfigs || []).length > 0">
        <div class="overflow-auto max-h-64">
          <div
            v-for="winStreakConfig in settingsStore.winStreakConfigs"
            :key="winStreakConfig.id"
            class="grid grid-cols-4 gap-2"
          >
            <settings-win-streak-config
              :win-streak-config="winStreakConfig"
            ></settings-win-streak-config>
          </div>
        </div>
        <div class="grid grid-cols-4 gap-2">
          <settings-add-win-streak-config></settings-add-win-streak-config>
        </div>
      </div>
      <div v-else class="place-content-center grid grid-cols-0">
        <common-spinner></common-spinner>
      </div>
    </div>
  </common-feature-container>
</template>

<style lang="sass" scoped>

.settings-container
  // height: 40rem

.winstreak-setting
  button
    height: 2.4rem
</style>
