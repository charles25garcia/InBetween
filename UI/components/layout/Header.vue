<script lang="ts" setup>
import { UserRoleEnum } from "~/@core/enums";
import { UserStatshttp } from "~/@core/https";
import { useProfileStore } from "~/stores/useProfileStore";
import { useUserStore } from "~/stores/useUserStore";

const profileStore = useProfileStore();

const { userFeaturesAsync } = useUserStore();
const userRole = Number(useCookie("userRole").value);
const { $features } = useNuxtApp() as any;
const referralId = ref(profileStore.userProfile.referralId);

const convertedPointsToChips = ref(0);

const chips = computed(() => profileStore.userProfile?.userStats?.chips);
const points = computed(() => profileStore.userProfile?.userStats?.points);
const remainingPoints = computed(
  () =>
    profileStore.userProfile?.userStats?.points -
    convertedPointsToChips.value * 500
);

const showPointsModal = ref(false);

watch(
  () => profileStore.userProfile,
  () => {
    referralId.value = profileStore.userProfile.referralId;
  }
);

onMounted(() => {
  userFeaturesAsync(userRole).then((data) => {
    $features.value = data;
  });
});

function onClickPoints() {
  showPointsModal.value = true;
}

async function convertPointsToChips() {
  if (!convertedPointsToChips.value) {
    return;
  }

  try {
    const { chips, points } = await UserStatshttp.convertPointsToChips(
      convertedPointsToChips.value * 500
    );

    profileStore.userProfile = {
      ...profileStore.userProfile,
      userStats: {
        ...profileStore.userProfile.userStats,
        chips,
        points,
      },
    };

    showPointsModal.value = false;
    convertedPointsToChips.value = 0;
  } catch (e) {
    console.log(e);
  }
}

function onClickConvert() {
  convertedPointsToChips.value += 100;
}

function onClickRevert() {
  convertedPointsToChips.value = 0;
}

async function resetPointsTo1000() {
  if (points.value > 1000) {
    return;
  }

  try {
    const { points } = await UserStatshttp.resetPoints();

    profileStore.userProfile = {
      ...profileStore.userProfile,
      userStats: {
        ...profileStore.userProfile.userStats,
        points,
      },
    };
  } catch (e) {
    console.log(e);
  }
}

function closeModal() {
  showPointsModal.value = false;
  convertedPointsToChips.value = 0;
}
</script>

<template>
  <header
    class="duration-300 theme-background h-12 pr-16 theme-border-color sticky top-0 z-50 flex justify-between items-center space-x-1 border-b bg-white p-4 shadow-md"
  >
    <div class="logo">
      <nuxt-link to="/">InBetween</nuxt-link>
    </div>
    <div class="flex">
      <!-- <button @click="sseStore.startDeck()">INIT</button> -->
      <!-- <input type="text" v-model="gameStore.userId" placeholder="userId" /> -->

      <navbar-referral-link
        v-if="userRole !== 4 && userRole !== 1"
        :referral-id="referralId || ''"
      />

      <div
        class="flex"
        v-if="profileStore.userProfile.userRole.id !== UserRoleEnum.ADMIN"
      >
        <navbar-chips-card :chips="chips || 0"></navbar-chips-card>

        <navbar-points-card
          @click="onClickPoints"
          :points="points || 0"
        ></navbar-points-card>
      </div>

      <navbar-notification-card
        :notification-count="100"
      ></navbar-notification-card>

      <navbar-avatar></navbar-avatar>

      <common-confirmation-modal
        class="text-white"
        v-if="showPointsModal"
        confirmation-message="Convert your Points to Chips"
        @confirm="convertPointsToChips"
        @cancel="closeModal"
      >
        <template #modal-body>
          <h5 class="text-sm">
            Points {{ remainingPoints }} -> Chips
            {{ convertedPointsToChips }}
          </h5>
          <label class="text-[10px]">50,000 points = 100 chips</label>

          <div class="grid grid-cols-2 mt-5">
            <button
              class="theme-submit-button theme-container h-full text-rose-600 p-1"
              :disabled="convertedPointsToChips < 1"
              @click="onClickRevert"
            >
              Revert
            </button>
            <button
              class="theme-submit-button theme-container h-full text-teal-600 p-1"
              :disabled="remainingPoints / 50000 < 1"
              @click="onClickConvert"
            >
              Convert
            </button>
          </div>
          <button
            class="theme-submit-button theme-container mt-2 w-full h-full text-amber-600 p-1"
            v-if="points < 1000"
            @click="resetPointsTo1000"
          >
            Reset Points to 1000
          </button>
          <br />
          <br />
        </template>
      </common-confirmation-modal>
    </div>
  </header>
</template>

<style lang="sass" scoped>
.logo
  color: white
  text-align: center

.profile-logo
  width: 50px
</style>
