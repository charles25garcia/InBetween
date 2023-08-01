<script lang="ts" setup>
import { DealHistoryDto } from "~/@core/dtos";
import { BetTypeEnum } from "~/@core/enums";

const props = defineProps<{
  histories: DealHistoryDto[];
  title: string;
}>();

const sortedHistories = computed(() => {
  const sortByDate = props.histories.sort(
    (a, b) => new Date(b.dateTime).getTime() - new Date(a.dateTime).getTime()
  );

  return mapToDisplayDealHistory(sortByDate);
});
</script>
<template>
  <div
    class="theme-form-bg px-2 theme-border-color border text-white py-2 h-72"
  >
    <h1 class="text-sm text-center font-bold">{{ title }}</h1>

    <div class="deal-history-container theme-form-bg overflow-y-auto mt-4">
      <table class="table-fixed w-full text-xs deal-history-table">
        <thead>
          <tr class="text-left">
            <th>Deal #</th>
            <th>Result</th>
            <th>Deals</th>
            <th>Lost</th>
            <th>Earned</th>
          </tr>
        </thead>
        <tbody class="divide-y divide-slate-200">
          <tr v-for="(history, i) in sortedHistories" :key="i">
            <td class="text-teal-100">{{ history.dealNo }}</td>
            <td :class="history.result?.color">{{ history.result?.label }}</td>
            <td class="text-teal-100">{{ history.deals }}</td>
            <td class="text-rose-500">{{ history.lost }}</td>
            <td class="text-green-600">{{ history.win }}</td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>
<style lang="sass" scoped>
@import "@/assets/sass/global-variable-colors"

.deal-history-container
  max-height: 14rem
  overflow-y: auto
  table
    thead
      position: sticky
      top: 0
      background-color: #1d1d1d
    tbody
      tr
        &:hover
          background-color: #a67b47
        td
          white-space: pre

@media (max-width: 968px)
  .deal-history-table
    font-size: 8px !important
</style>
