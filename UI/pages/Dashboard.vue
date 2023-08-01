<script lang="ts" setup>
import { DealHistoryHttp } from "~/@core/https";

const tabs = [
  {
    id: 0,
    displayName: "Active Status",
  },
  {
    id: 1,
    displayName: "Top 5 Deal History",
  },
  {
    id: 2,
    displayName: "Donation Request",
  },
  {
    id: 3,
    displayName: "Withdrawal Request",
  },
];

const activeTab = ref(1);
const totalDeals = ref(0);
const totalDonations = ref(0);

function setActiveTab(id: number) {
  activeTab.value = id;
}

async function reloadCurrentTotalDeals() {
  totalDeals.value = await DealHistoryHttp.getTotalChipsDealsToday();
}

function updateDonationCount(count: number) {
  totalDonations.value = count;
}
</script>

<template>
  <div class="dashboard h-fit">
    <div class="grid grid-cols-3 gap-2">
      <common-card :count="50" title="Activation Count"></common-card>
      <common-card
        :count="totalDeals"
        title="Total Deals"
        description="For today"
      ></common-card>
      <common-card
        :count="totalDonations"
        title="Donation"
        description="For today"
      ></common-card>
    </div>

    <div
      class="text-sm font-medium text-center text-gray-500 border-b border-gray-200 dark:text-gray-400 dark:border-gray-700"
    >
      <ul class="flex flex-wrap -mb-px">
        <li
          class="mr-2"
          v-for="tab in tabs"
          :key="tab.id"
          @click="setActiveTab(tab.id)"
        >
          <a
            href="#"
            :class="tab.id === activeTab ? 'active' : ''"
            class="inline-block p-4 border-b-2 border-transparent rounded-t-lg hover:text-gray-600 hover:border-gray-300 dark:hover:text-gray-300"
            >{{ tab.displayName }}</a
          >
        </li>
      </ul>
    </div>
    <br />

    <dashboard-active-status v-show="activeTab === 0"></dashboard-active-status>
    <dashboard-deal-history
      v-show="activeTab === 1"
      @reload="reloadCurrentTotalDeals"
    ></dashboard-deal-history>
    <dashboard-donation-request
      v-show="activeTab === 2"
      @reload="updateDonationCount"
    ></dashboard-donation-request>
    <dashboard-withdrawal-request
      v-show="activeTab === 3"
    ></dashboard-withdrawal-request>
  </div>
</template>

<style lang="sass" scoped>
@import "@/assets/sass/global-variable-colors"

.table-container
    height: 30vh

ul
  .active
    border-bottom: 2px solid $global-border-color
    color: $global-border-color
    font-weight: bold
</style>
