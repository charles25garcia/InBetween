<script lang="ts" setup>
import type { Item } from "vue3-easy-data-table";
import { useUserStore } from "~/stores";
import { useProfileStore } from "~/stores/useProfileStore";

const profileStore = useProfileStore();
const userStore = useUserStore();

const showMechanicsModal = ref(false);
const isLoading = ref(false);
const users = ref();
const items = ref<Item[]>([]);
const itemsSelected = ref<Item[]>([]);
const usersSelected = ref();
const showCheckBox = ref(false);
const userRole = Number(useCookie("userRole").value);

onBeforeMount(async () => {
  getReferrals();
});

const getReferrals = async () => {
  isLoading.value = true;

  const token = useCookie("jwt").value;
  if (token) {
    profileStore.setToken(token);
    await profileStore.fetchUserProfile();
  }

  users.value = await userStore.getReferrals(
    profileStore.userProfile.referralId
  );
};

const isDisabled = computed(() =>
  itemsSelected.value.length === 0 ? true : false
);

watch(users, (newUsers) => {
  if (newUsers) {
    items.value = newUsers.map((user: any) => ({
      fullName: user.fullName,
      email: user.email,
      contactNo: user.contactNo,
      username: user.username,
      role: user.userRole.roleDescription,
    }));

    if (userRole === 2) {
      showCheckBox.value = items.value.length !== 0;
    }

    isLoading.value = false;
  }
});

const promote = () => {
  usersSelected.value = itemsSelected.value.map((itemSelected) => {
    return users.value.find((i: any) => i.username === itemSelected.username);
  });

  showMechanicsModal.value = true;
};

const updateSelected = (val: any) => {
  itemsSelected.value = val;
};

const reloadOnUpdate = () => {
  itemsSelected.value = [];
  getReferrals();
};
</script>

<template>
  <common-feature-container title="Referrals">
    <div class="users-container">
      <br />
      <common-table
        :items="items"
        :isLoading="isLoading"
        :show-check-box="showCheckBox"
        export-file-name="Referrals"
        @update-selected="updateSelected"
        @refresh="getReferrals"
      >
      </common-table>
      <div class="relative justify-start mt-5" v-if="userRole === 2">
        <button
          class="border theme-border-color rounded-md py-1 px-2"
          :class="{ 'disabled:opacity-50 cursor-not-allowed': isDisabled }"
          @click="promote"
          :disabled="isDisabled"
        >
          Promote
        </button>
      </div>
    </div>
  </common-feature-container>

  <common-enhanced-modal
    :show-modal="showMechanicsModal || false"
    @close-modal="showMechanicsModal = false"
  >
    <referrals-confirmation-modal-content
      :selected-users="usersSelected"
      @update="reloadOnUpdate"
      @close-modal="showMechanicsModal = false"
    />
  </common-enhanced-modal>
</template>
