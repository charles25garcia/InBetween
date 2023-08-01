<script lang="ts" setup>
import { WithdrawalDto } from "~/@core/dtos";
import { WithdrawalHttp } from "~/@core/https";
import { WithdrawalDisplayListConst } from "~/@shared/constants";
import dayjs from "dayjs";
import { WithdrawalStatusEnum, WithdrawalTypeEnum } from "~/@core/enums";

const isLoading = ref(false);
const pendingWithdrawals = ref<WithdrawalDto[]>([]);
const emit = defineEmits(["reload"]);

onMounted(async () => {
  await loadPending();
});

async function loadPending() {
  isLoading.value = true;

  const res = await WithdrawalHttp.getPendingWithdrawals(5, [
    WithdrawalStatusEnum.APPROVED,
    WithdrawalStatusEnum.DECLINED,
  ]);
  emit("reload");
  pendingWithdrawals.value = res.sort(
    (a: any, b: any) =>
      new Date(b.dateTime || "").getTime() -
      new Date(a.dateTime || "").getTime()
  );
  isLoading.value = false;
}

function getEnumKeyByValue<T>(enumObj: T, value: any): keyof T | null {
  for (const key in enumObj) {
    if (enumObj[key] === value) {
      return key;
    }
  }
  return null;
}

function getTableData() {
  return pendingWithdrawals.value.map(
    ({ id, amount, status, dateTime, lastUpdate, user, type }) => {
      const displayStatus = WithdrawalDisplayListConst.find(
        (d) => d.status === status
      )?.displayStatus;

      const formattedRequestedDate = dayjs(dateTime || "").format(
        "YYYY-MM-DD h:mm A"
      );

      const username = user.username;

      const formattedLastUpdate = lastUpdate
        ? dayjs(lastUpdate || "").format("YYYY-MM-DD h:mm A")
        : "";

      const data = {
        username,
        dateRequested: formattedRequestedDate,
        lastUpdated: formattedLastUpdate,
        amount,
        type: getEnumKeyByValue(WithdrawalTypeEnum, type),
        status: displayStatus,
      };

      return data;
    }
  );
}
</script>

<template>
  <div>
    <common-feature-container title="Withdrawals">
      <div class="withdrawals-container mt-4">
        <common-table
          export-file-name="Deal History"
          :items="getTableData()"
          @refresh="loadPending"
          :is-loading="isLoading"
        ></common-table>
      </div>
    </common-feature-container>
  </div>
</template>
<style lang="sass" scoped>
@import "@/assets/sass/global-variable-colors"
</style>
