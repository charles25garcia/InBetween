<script lang="ts" setup>
import { WithdrawalDto } from "~/@core/dtos";
import { WithdrawalHttp } from "~/@core/https";
import { WithdrawalDisplayListConst } from "~/@shared/constants";
import { useProfileStore } from "~/stores";
import dayjs from "dayjs";
import { CommissionModel } from "~/@shared/models";

const profileStore = useProfileStore();

const showRequestConfirmation = ref(false);
const showCancelationConfirmation = ref(false);
const isLoading = ref(false);

const requestIdForCancelation = ref<number | undefined>(undefined);

const errorMessage = ref<{
  message: string;
  show: boolean;
  type?: "error" | "success";
}>({
  message: "",
  show: false,
});
const commissionWithdrawalHistory = ref<WithdrawalDto[]>([]);

const requestCommissionInput = useInputField({
  id: "commissionRequest",
  displayName: "Amount",
  type: "number",
  required: true,
});

onMounted(async () => {
  await loadHistory();
});

async function submitWithdrawalRequest() {
  try {
    isLoading.value = true;
    const res = await WithdrawalHttp.sendCommissionWithdrawalRequest(
      profileStore.userProfile.id,
      +requestCommissionInput.getValue()
    );

    updateCommsions(res);

    await loadHistory();

    requestCommissionInput.setValue("");

    errorMessage.value = {
      message: "Withdrawal request has been sent",
      show: true,
      type: "success",
    };
  } catch (e) {
    errorMessage.value = {
      message: e as any,
      show: true,
    };
  }

  showRequestConfirmation.value = false;
  isLoading.value = false;
}

function showConfirmation() {
  if (requestCommissionInput.getValue().length < 1) {
    return;
  }

  const requestedAmount = Number(requestCommissionInput.getValue());

  if (Number(profileStore.userProfile?.commission?.amount) < requestedAmount) {
    errorMessage.value = {
      message: "Amount Exceeded!",
      show: true,
      type: "error",
    };
    return;
  }

  showRequestConfirmation.value = true;
}

async function loadHistory() {
  isLoading.value = true;
  const res = await WithdrawalHttp.getCommissionsHistory(
    profileStore.userProfile.id
  );

  await profileStore.fetchUserProfile();

  commissionWithdrawalHistory.value = res.sort(
    (a, b) =>
      new Date(b.dateTime || "").getTime() -
      new Date(a.dateTime || "").getTime()
  );
  isLoading.value = false;
}

function getTableData() {
  return commissionWithdrawalHistory.value.map(
    ({
      id,
      amount,
      status,
      dateTime,
      approver,
      lastUpdate,
      approverComments,
    }) => {
      const displayStatus = WithdrawalDisplayListConst.find(
        (d) => d.status === status
      )?.displayStatus;

      const formattedRequestedDate = dayjs(dateTime || "").format(
        "YYYY-MM-DD h:mm A"
      );

      const formattedLastUpdate = lastUpdate
        ? dayjs(lastUpdate || "").format("YYYY-MM-DD h:mm A")
        : "";

      return {
        id,
        dateRequested: formattedRequestedDate,
        lastUpdated: formattedLastUpdate,
        amount,
        status: displayStatus,
        approvedBy: approver?.fullName || "N/A",
        comments: approverComments,
        action: "action",
      };
    }
  );
}

async function cancelWithdrawalRequest() {
  if (requestIdForCancelation.value === undefined) {
    return;
  }

  isLoading.value = true;

  try {
    const res = await WithdrawalHttp.cancelCommissionRequest(
      requestIdForCancelation.value || 0
    );

    await loadHistory();
    updateCommsions(res);
  } catch (e) {
    console.log("Commission withdrawal cancelation request error: " + e);
  }

  requestIdForCancelation.value = undefined;
  isLoading.value = false;
  showCancelationConfirmation.value = false;
}

function setIdForCancellation(requestId: number) {
  requestIdForCancelation.value = requestId;
  showCancelationConfirmation.value = true;
}

function updateCommsions(commssion: CommissionModel) {
  profileStore.userProfile = {
    ...profileStore.userProfile,
    commission: {
      ...profileStore.userProfile.commission,
      amount: commssion.amount,
      lastUpdated: commssion.lastUpdated,
    },
  };
}
</script>
<template>
  <common-feature-container
    title="Commissions"
    :description="`Total: ${profileStore.userProfile?.commission?.amount || 0}`"
  >
    <div class="chips-withdrawals-container">
      <h2>Request</h2>
      <div class="grid grid-cols-2 gap-2">
        <form @submit.prevent="showConfirmation">
          <div class="grid grid-cols-2 gap-2">
            <common-input-field
              :inputField="requestCommissionInput"
            ></common-input-field>
            <button
              class="theme-submit-button theme-container w-full text-teal-600 rounded-md h-10 mt-6"
            >
              <common-spinner v-if="isLoading"></common-spinner>

              <label v-else>Send</label>
            </button>
          </div>
        </form>

        <br />
        <div>
          <common-label-message-alert
            :show="errorMessage.show"
            :message="errorMessage.message"
            :duration="2000"
            :type="errorMessage.type"
            @onStateChange="
              errorMessage = {
                message: '',
                show: false,
              }
            "
          ></common-label-message-alert>
        </div>
      </div>
      <br />
      <h2>Withdrawals</h2>
      <br />
      <common-table
        export-file-name="Commission Withdrawal History"
        :items="getTableData()"
        :is-loading="isLoading"
        @refresh="loadHistory"
      >
        <template #actionSlot="slotProps">
          <button
            class="theme-container w-full text-rose-600 theme-submit-button"
            :disabled="slotProps.item.status !== 'Pending'"
            @click="setIdForCancellation(slotProps.item.id)"
          >
            CANCEL
          </button>
        </template>

        ></common-table
      >
    </div>
    <common-confirmation-modal
      v-if="showRequestConfirmation"
      confirmation-message="Are you sure you want to send this request?"
      @confirm="submitWithdrawalRequest"
      @cancel="showRequestConfirmation = false"
    />

    <common-confirmation-modal
      v-if="showCancelationConfirmation"
      confirmation-message="Are you sure you want to cancel this request?"
      @confirm="cancelWithdrawalRequest"
      @cancel="showCancelationConfirmation = false"
    />
  </common-feature-container>
</template>
<style lang="sass" scoped></style>
