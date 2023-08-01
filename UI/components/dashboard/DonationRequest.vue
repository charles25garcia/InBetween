<script lang="ts" setup>
import { DonationHistoryDto } from "~/@core/dtos";
import { DonationHttp } from "~/@core/https";
import dayjs from "dayjs";

const emit = defineEmits(["reload"]);

const loadingDonations = ref(false);
const donationsToday = ref<DonationHistoryDto[]>([]);

onMounted(async () => {
  await loadDonations();
});

async function loadDonations() {
  loadingDonations.value = true;
  donationsToday.value = await DonationHttp.getDonationToday();

  emit("reload", donationsToday.value.length);
  loadingDonations.value = false;
}
</script>
<template>
  <div>
    <common-table
      export-file-name="Donations Today"
      :items="
        donationsToday.map((i) => {
            const donatedOn = dayjs(i.dateTime).format('YYYY-MM-DD h:mm A');


          return {
            donatedTo: i.donatedTo.fullName,
            donatedPoints: i.points,
            donatedChips: i.chips,
            pointsBeforeAndAfter: `${i.pointsBefore} -> ${i.actualPoints}`,
            chipsBeforeAndAfter: `${i.chipsBefore} -> ${i.actualChips}`,
            date: donatedOn,
          };
        })
      "
      @refresh="loadDonations"
      :is-loading="loadingDonations"
      :height="220"
      :use-default-color="true"
    ></common-table>
  </div>
</template>
