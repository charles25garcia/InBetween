<script lang="ts" setup>
import { useProfileStore } from "~/stores/useProfileStore";
import { useUserStore } from "~/stores/useUserStore";
import { useGameStore } from "~/stores/useGameStore";
import { dealTypes } from "~/@core/constants";
import { useDealHistoryStore, useSseStore } from "~/stores";
import Mechanics from "~/pages/Mechanics.vue";
import { DeckResultsModel } from "~/@core/models";

const profileStore = useProfileStore();
const userStore = useUserStore();
const sseStore = useSseStore();
const gameStore = useGameStore();
const dealHistory = useDealHistoryStore();

onBeforeMount(async () => {
  if (profileStore.token.length > 0) {
    await sseStore.startDeck();
    gameStore.getChipsBetLockedData();
    dealHistory.loadDealHistories(profileStore.userProfile.id);
  }
});

onUnmounted(() => {
  sseStore.closeEventSource();
});

definePageMeta({
  layout: "game-layout",
});

const showMechanicsModal = ref(profileStore.userProfile?.showMechanics);
const showMechanics = ref(false);
const showChips = ref(true);

const deckResults = computed(() => {
  const results: DeckResultsModel[] = [];

  if (gameStore.betChipsResult) {
    results.push({
      ...gameStore.betChipsResult,
      title: "Chips",
    });
  }

  if (gameStore.betPointsResult) {
    results.push({ ...gameStore.betPointsResult, title: "Points" });
  }
  return results;
});

const totalAmount = computed(() => {
  let totalAmount = 0;
  gameStore.chipsBetLockedData.forEach((chipBetLockedData) => {
    if (!isNaN(chipBetLockedData.totalAmount)) {
      totalAmount += chipBetLockedData.totalAmount; // Add the value to the sum
    }
  });

  return totalAmount;
});

watch(
  () => profileStore.userProfile,
  () => {
    showMechanicsModal.value = profileStore.userProfile.showMechanics;
  }
);

const closeMechanicsModal = () => {
  if (showMechanics.value) {
    userStore.updateShowMechanics(profileStore.userProfile.id);
  }
  showMechanicsModal.value = false;
};
</script>

<template>
  <div class="absolute top-0 right-0 mr-5 mt-2">
    <button
      class="theme-submit-button theme-container rounded-xl px-2"
      @click="gameStore.toggleBGMMute"
    >
      BGM
      <font-awesome-icon
        v-if="gameStore.isBGMMuted"
        :icon="['fass', 'volume-mute']"
      />
      <font-awesome-icon v-else :icon="['fass', 'music']" />
    </button>

    <button
      class="theme-submit-button theme-container rounded-xl px-2"
      @click="gameStore.toggleSFXMute"
    >
      SFX
      <font-awesome-icon
        v-if="gameStore.isSFXMuted"
        :icon="['fass', 'volume-mute']"
      />
      <font-awesome-icon v-else :icon="['fass', 'volume-up']" />
    </button>
  </div>

  <div class="head grid grid-cols-3 mt-2">
    <div></div>

    <div class="absolute -top-11 right-10"></div>
  </div>
  <div class="middle px-2">
    <div class="grid grid-cols-4 grid-row-3">
      <div class="left theme-container border p-4 mr-3 row-span-2 relative">
        <div class="z-50 relative">
          <game-history :deal-type="dealTypes.straight" />
        </div>
        <div class="mt-7">
          <game-history :deal-type="dealTypes.arranged" />
        </div>
      </div>
      <div class="card-container col-span-2 grid-row-2">
        <div class="theme-container border p-4">
          <div class="theme-container p-2">
            <game-multiplier></game-multiplier>
          </div>

          <game-cards class="mt-4"></game-cards>
        </div>
        <div class="theme-container mt-1 py-4 px-3">
          <div class="flex justify-between items-center">
            <div class="text-white text-4xl font-bold">
              Deal
              <span class="text-yellow-500"
                >#{{ gameStore.deck.dealNumber }}</span
              >
            </div>
            <div class="text-white text-4xl font-bold mr-12">
              {{ totalAmount }}
            </div>
            <game-timer />
          </div>

          <game-chips-bet-container class="mt-6 text-center" />
        </div>
      </div>
      <div class="right theme-container border p-4 ml-3 row-span-2 relative">
        <div class="chips-containeer" v-show="showChips">
          <button
            class="w-18 h-10 top-3 right-4 rounded-md absolute font-bold text-xs tab-hover"
            @click="showChips = false"
          >
            Points →
          </button>
          <game-chips-bet-selector />
        </div>
        <div class="points-containeer" v-show="!showChips">
          <button
            class="w-18 h-10 top-3 right-4 rounded-md absolute font-bold text-xs tab-hover"
            @click="showChips = true"
          >
            ← Chips
          </button>
          <game-points-bet-selector />
        </div>

        <br />
        <game-deck-results :results="deckResults"></game-deck-results>
        <br />
        <game-deal-history
          :histories="
            showChips
              ? dealHistory.chipsDealHistory
              : dealHistory.pointsDealHistory
          "
          :title="showChips ? 'Chips Deal history' : 'Points Deal history'"
        ></game-deal-history>
      </div>
    </div>
  </div>

  <div class="bottom bg-white"></div>

  <common-modal :show-modal="showMechanicsModal || false">
    <mechanics
      :show-in-modal="true"
      @close-modal="closeMechanicsModal"
      :show-mechanics="showMechanics"
      @update:show-mechanics="(value) => (showMechanics = value)"
    />
  </common-modal>
</template>

<style lang="sass" scoped>
@import "@/assets/sass/global-variable-colors"

.tab-hover
  &:hover
    color: $global-hovered-border-color
</style>
