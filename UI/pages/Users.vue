<script lang="ts" setup>
import { UserDto } from "~/@core/dtos";
import { useUserStore } from "~/stores";
import dayjs from "dayjs";

const userStore = useUserStore();

const selectedUser = ref<UserDto>();
const users = ref<UserDto[]>([]);
const showMechanicsModal = ref(false);
const showManualWithdrawalModal = ref(false);
const isLoading = ref(false);

onMounted(async () => {
  updateUsers();
});

async function updateUsers() {
  isLoading.value = true;
  users.value = await userStore.getUsers();
  isLoading.value = false;
}

function openAddStats(username: string) {
  showMechanicsModal.value = true;

  selectedUser.value = users.value.find((i) => i.username === username);
}

async function openManualWithdrawal(username: string) {
  showManualWithdrawalModal.value = true;

  selectedUser.value = users.value.find((i) => i.username === username);
  // await AdminHttp.manualWithdrawal(selectedUser.value );
}
</script>

<template>
  <common-feature-container title="Users">
    <div class="users-container">
      <br />
      <common-table
        exportFileName="Users"
        :items="
          users.map((i) => {
            const { id, userRole, userRoleId, userStats, ...rest } = i;

            const formattedLastUpdated = dayjs(
              i.userStats?.lastUpdatedDateTime || ''
            ).format('YYYY-MM-DD h:mm A');

            const dateOfRegistration = dayjs(i.dateOfRegistration || '').format(
              'YYYY-MM-DD h:mm A'
            );

            return {
              fullname: i.fullName,
              email: i.email,
              contactNo: i.contactNo,
              username: i.username,
              isActive: i.isActive ? 'Active' : 'Inactive',
              lastUpdated: i.userStats?.lastUpdatedDateTime
                ? formattedLastUpdated
                : '',
              dateOfRegistration: dateOfRegistration,
              role: i.userRole.roleDescription,
              points: i.userStats?.points || 0,
              chips: i.userStats?.chips || 0,
              commission: i.commission?.amount || 0,
              action: 'action',
            };
          })
        "
        @refresh="updateUsers"
        :isLoading="isLoading"
      >
        <template #actionSlot="slotProps">
          <div class="grid grid-cols-2 gap-1">
            <button
              class="theme-container w-full text-teal-600 theme-submit-button"
              @click="openAddStats(slotProps.item.username)"
            >
              <font-awesome-icon :icon="['fass', 'plus']" />
            </button>
            <button
              class="theme-container w-full text-amber-600 theme-submit-button"
              @click="openManualWithdrawal(slotProps.item.username)"
            >
              <font-awesome-icon :icon="['fass', 'money-bill-transfer']" />
            </button>
          </div>
        </template>
      </common-table>
      <br />
      <user-add-platinum-container
        @update-user="updateUsers"
      ></user-add-platinum-container>

      <!-- Add Stats Modal -->
      <common-enhanced-modal
        :show-modal="showMechanicsModal || false"
        @close-modal="showMechanicsModal = false"
      >
        <user-add-stats-modal-content
          :selectedUserId="selectedUser?.id || ''"
          :selectedUserFullName="selectedUser?.fullName || ''"
          @close-modal="showMechanicsModal = false"
          @update-users="updateUsers"
        ></user-add-stats-modal-content>
      </common-enhanced-modal>
      <!-- Add Stats Modal End -->

      <!-- Manual Withdrawal Modal -->
      <common-enhanced-modal
        :show-modal="showManualWithdrawalModal || false"
        @close-modal="showManualWithdrawalModal = false"
      >
        <user-manual-withdrawal-modal-content
          :selectedUserId="selectedUser?.id || ''"
          :selectedUserFullName="selectedUser?.fullName || ''"
          @close-modal="showManualWithdrawalModal = false"
          @update-users="updateUsers"
        ></user-manual-withdrawal-modal-content>
      </common-enhanced-modal>
      <!-- Manual Withdrawal Modal End-->
    </div>
  </common-feature-container>
</template>
