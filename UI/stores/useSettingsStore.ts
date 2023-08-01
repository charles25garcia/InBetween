import { defineStore } from "pinia";

import { WinstreakBonusDto } from "~/@core/dtos";
import { SettingHttp } from "~/@core/https";

export const useSettingsStore = defineStore("settings", () => {
  const winStreakConfigs = ref<WinstreakBonusDto[]>();

  async function updateWinstreakConfigData() {
    setWinStreakConfigs(await SettingHttp.getWinstreakConfigData());
  }

  function setWinStreakConfigs(configs: WinstreakBonusDto[]) {
    winStreakConfigs.value = configs.sort((a, b) => a.winStreak - b.winStreak);
  }

  async function updateWinStreakConfigs(configs: WinstreakBonusDto[]) {
    const updatedConfigs = await SettingHttp.updateWinStreakConfigs(configs);
    setWinStreakConfigs(updatedConfigs);
  }

  async function deleteWinStreakConfigs(ids: number[]) {
    const updatedConfigs = await SettingHttp.deleteWinStreakConfigs(ids);
    setWinStreakConfigs(updatedConfigs);
  }

  async function addWinStreakConfig(config: WinstreakBonusDto) {
    const updatedConfigs = await SettingHttp.addWinStreakConfig(config);
    setWinStreakConfigs(updatedConfigs);
  }

  return {
    winStreakConfigs,
    updateWinstreakConfigData,
    setWinStreakConfigs,
    updateWinStreakConfigs,
    deleteWinStreakConfigs,
    addWinStreakConfig,
  };
});
