<script lang="ts" setup>
import { DealHistoryHttp } from "~/@core/https";
import { DealHistoryDisplayModel } from "~/@shared/models";

const emit = defineEmits(["reload"]);

const loadingCurrentDeal = ref(false);
const currentDeals = ref<DealHistoryDisplayModel[]>([]);

onMounted(async () => {
  await loadCurrentDeals();
});

async function loadCurrentDeals() {
  loadingCurrentDeal.value = true;
  const histories = await DealHistoryHttp.getDealHistories();
  emit("reload");
  currentDeals.value = mapToDisplayDealHistory(histories);
  loadingCurrentDeal.value = false;
}
</script>
<template>
  <div>
    <common-table
      export-file-name="Deal History"
      :items="
        currentDeals.map((i) => ({
          fullName: i.fullName,
          result: i.result.label,
          deals: i.deals,
          lost: i.lost,
          earned: i.win,
          date: i.date
        }))
      "
      @refresh="loadCurrentDeals"
      :is-loading="loadingCurrentDeal"
      :height="220"
      :use-default-color="true"
    ></common-table>
  </div>
</template>
<style lang="sass" scoped>
@import "@/assets/sass/global-variable-colors"


</style>
