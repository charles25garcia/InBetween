<script lang="ts" setup>
import { UpdateWithdrawalDto, WithdrawalDto } from "~/@core/dtos";
import { AdminHttp, WithdrawalHttp } from "~/@core/https";
import {
  UserRoleListConst,
  WithdrawalDisplayListConst,
} from "~/@shared/constants";
import dayjs from "dayjs";
import { WithdrawalStatusEnum, WithdrawalTypeEnum } from "~/@core/enums";
import { useProfileStore } from "~/stores";

const profileStore = useProfileStore();

const isLoading = ref(false);
const pendingWithdrawals = ref<WithdrawalDto[]>([]);

const showApproveConfirmation = ref(false);
const showDeclineConfirmation = ref(false);
const requestIdForApproval = ref();
const requestIdForDecline = ref();
const declineComment = ref<string>("");

const route = useRoute();

const type = route.params.type.toString().toUpperCase();

const title = ref(`${type} WITHDRAWALS`);

onMounted(async () => {
  await loadPending();
});

async function loadPending() {
  isLoading.value = true;

  const validatedType = type.toUpperCase() as keyof typeof WithdrawalTypeEnum;

  const res = await AdminHttp.getPendingWithdrawals(
    WithdrawalTypeEnum[validatedType]
  );

  pendingWithdrawals.value = res.sort(
    (a: any, b: any) =>
      new Date(b.dateTime || "").getTime() -
      new Date(a.dateTime || "").getTime()
  );
  isLoading.value = false;
}

function setIdForApproval(requestId: number) {
  requestIdForApproval.value = requestId;
  showApproveConfirmation.value = true;
}

function setIdForDecline(requestId: number) {
  requestIdForDecline.value = requestId;
  showDeclineConfirmation.value = true;
}

async function approveRequest() {
  isLoading.value = true;

  const approveDetails: UpdateWithdrawalDto = {
    id: requestIdForApproval.value,
    status: WithdrawalStatusEnum.APPROVED,
    comment: "",
    userId: profileStore.userProfile.id,
  };

  await AdminHttp.approveWithdrawalRequest(approveDetails);

  await loadPending();

  showApproveConfirmation.value = false;
  isLoading.value = false;
}

async function declineRequest() {
  isLoading.value = true;

  const declineDetails: UpdateWithdrawalDto = {
    id: requestIdForDecline.value,
    status: WithdrawalStatusEnum.DECLINED,
    comment: declineComment.value,
    userId: profileStore.userProfile.id,
  };
  const validatedType = type.toUpperCase() as keyof typeof WithdrawalTypeEnum;

  await AdminHttp.declineWithdrawalRequest(
    declineDetails,
    WithdrawalTypeEnum[validatedType]
  );

  await loadPending();

  declineComment.value = "";
  showDeclineConfirmation.value = false;
  isLoading.value = false;
}

function getTableData() {
  return pendingWithdrawals.value.map(
    ({ id, amount, status, dateTime, lastUpdate, user }) => {
      const displayStatus = WithdrawalDisplayListConst.find(
        (d) => d.status === status
      )?.displayStatus;

      const formattedRequestedDate = dayjs(dateTime || "").format(
        "YYYY-MM-DD h:mm A"
      );

      const formattedLastUpdate = lastUpdate
        ? dayjs(lastUpdate || "").format("YYYY-MM-DD h:mm A")
        : "";

      const data = {
        id,
        fullName: user.fullName,
        role: UserRoleListConst.find((i) => i.roleId === user.userRoleId)
          ?.displayName,
        dateRequested: formattedRequestedDate,
        lastUpdated: formattedLastUpdate,
        amount,
        status: displayStatus,
        action: "action",
      };

      return data;
    }
  );
}
</script>

<template>
  <common-feature-container :title="title">
    <div class="users-container">
      <br />
      <common-table
        exportFileName="Withdrawals"
        :items="getTableData()"
        :isLoading="isLoading"
        @refresh="loadPending"
      >
        <template #actionSlot="slotProps">
          <div class="flex justify-between item-center">
            <button
              class="theme-container w-full text-green-600 theme-submit-button"
              @click="setIdForApproval(slotProps.item.id)"
            >
              APPROVE
            </button>
            <button
              class="theme-container w-full text-rose-600 theme-submit-button"
              @click="setIdForDecline(slotProps.item.id)"
            >
              DECLINE
            </button>
          </div>
        </template>
      </common-table>
    </div>

    <common-confirmation-modal
      v-if="showApproveConfirmation"
      confirmation-message="Are you sure you want to approve this request?"
      @confirm="approveRequest"
      @cancel="showApproveConfirmation = false"
    />

    <common-confirmation-modal
      v-if="showDeclineConfirmation"
      confirmation-message="Are you sure you want to decline this request?"
      @confirm="declineRequest"
      @cancel="showDeclineConfirmation = false"
    >
      <template #modal-body>
        <h3 class="text-center mb-2">Comment here:</h3>
        <div class="flex justify-center items-center mb-10">
          <textarea
            class="theme-background w-72 border theme-border-color"
            v-model="declineComment"
          ></textarea>
        </div>
      </template>
    </common-confirmation-modal>
  </common-feature-container>
</template>
