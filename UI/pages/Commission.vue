<script lang="ts" setup>
import { useProfileStore, useCommissionStore } from "~/stores";
import { CommissionHistoryDto } from "~/@core/dtos";
import { CommissionDetailsModel } from "~/@core/models";
import dayjs from "dayjs";

const commissionStore = useCommissionStore();
const profileStore = useProfileStore();
const isLoading = ref(false);
const commissions = ref<CommissionDetailsModel[]>([]);

onBeforeMount(async () => {
  getCommissions();
});

const getCommissions = async () => {
  isLoading.value = true;

  const token = useCookie("jwt").value;
  if (token) {
    profileStore.setToken(token);
    await profileStore.fetchUserProfile();
  }

  const userDetails: CommissionHistoryDto = {
    userRoleId: Number(useCookie("userRole").value),
    referralId: profileStore.userProfile.referralId,
  };

  commissions.value = await commissionStore.getCommission(userDetails);

  isLoading.value = false;
};
</script>

<template>
  <common-feature-container title="Commission">
    <div class="users-container">
      <br />
      <common-table
        exportFileName="Commission"
        :items="
          commissions.map((commission) => {
            const formattedCommissionDate = dayjs(
              commission.commissionDate
            ).format('MM-DD-YYYY');

            return {
              ...commission,
              commissionDate: formattedCommissionDate,
            };
          })
        "
        :isLoading="isLoading"
        @refresh="getCommissions"
      >
      </common-table>
    </div>
  </common-feature-container>
</template>
