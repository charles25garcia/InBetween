<script lang="ts" setup>
import dayjs from "dayjs";
import { DonationHistoryDto } from "~/@core/dtos";
import { DonationHttp } from "~/@core/https";
import { useProfileStore } from "~/stores/";

const userProfileStore = useProfileStore();

const isLoading = ref(false);
const donations = ref<
  {
    donatedTo: string;
    donatedPoints: number;
    donatedChips: number;
    pointsBeforeAndAfter: string;
    chipsBeforeAndAfter: string;
    date: string;
  }[]
>([]);

watch(
  () => userProfileStore.userProfile,
  () => {
    if (userProfileStore.userProfile?.id) {
      updateDonations(userProfileStore.userProfile.id);
    }
  }
);

onMounted(() => {
  if (userProfileStore.userProfile?.id) {
    updateDonations(userProfileStore.userProfile.id);
  }
});

async function updateDonations(userId: string) {
  isLoading.value = true;

  const res: DonationHistoryDto[] = await DonationHttp.getDonations(userId);

  const sortByDate = res.sort(
    (a, b) => new Date(b.dateTime).getTime() - new Date(a.dateTime).getTime()
  );

  donations.value = sortByDate.map((i) => {
    const donatedOn = dayjs(i.dateTime).format("YYYY-MM-DD h:mm A");

    return {
      donatedTo: i.donatedTo.fullName || "",
      donatedPoints: i.points,
      donatedChips: i.chips,
      pointsBeforeAndAfter: `${i.pointsBefore} -> ${i.actualPoints}`,
      chipsBeforeAndAfter: `${i.chipsBefore} -> ${i.actualChips}`,
      date: donatedOn,
    };
  });

  isLoading.value = false;
}
</script>

<template>
  <common-feature-container title="Donations">
    <div class="donation-container mt-4">
      <common-table
        :items="donations"
        :isLoading="isLoading"
        exportFileName="Donations"
        @refresh="updateDonations(userProfileStore.userProfile.id)"
      >
      </common-table>
    </div>
  </common-feature-container>
</template>
