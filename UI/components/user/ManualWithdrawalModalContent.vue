<script lang="ts" setup>
import { useUserStore } from "~/stores";
import { useProfileStore } from "~/stores/useProfileStore";

const props = defineProps<{
  selectedUserId: string;
  selectedUserFullName: string;
}>();
const emitter = defineEmits(["closeModal", "updateUsers"]);

const { manualWithdrawal } = useUserStore();
const {
  userProfile: { username },
} = useProfileStore();

const showMessage = ref({
  showError: false,
  message: "",
});

const commissionModalInput = useInputField({
  displayName: "Commission",
  type: "number",
  value: "",
});
const chipsModalInput = useInputField({
  displayName: "Chips",
  type: "number",
  value: "",
});
const passwordModalInput = useInputField({
  displayName: "Password",
  type: "password",
  required: true,
  value: "",
});

function closeModal() {
  emitter("closeModal");

  commissionModalInput.clear();
  chipsModalInput.clear();
  passwordModalInput.clear();
}

async function submintManualWithdrawal() {
  const commissionAmount = +commissionModalInput.getValue() || 0;
  const chips = +chipsModalInput.getValue() || 0;

  if (chips < 0 || commissionAmount < 0) {
    showMessage.value = {
      showError: true,
      message: "Invalid amount!",
    };

    return;
  }

  try {
    await manualWithdrawal(
      props.selectedUserId,
      passwordModalInput.getValue(),
      commissionAmount,
      chips
    );
    emitter("updateUsers");
    closeModal();
  } catch {
    showMessage.value = {
      showError: true,
      message: "Incorrect password!",
    };
  }
}
</script>
<template>
  <h2 class="text-center font-bold">
    Manual Withdrawal For {{ selectedUserFullName }}
  </h2>
  <form @submit.prevent="submintManualWithdrawal">
    <div class="grid grid-cols-2 gap-2">
      <common-input-field
        :inputField="commissionModalInput"
      ></common-input-field>
      <common-input-field :inputField="chipsModalInput"></common-input-field>
    </div>
    <common-input-field :inputField="passwordModalInput"></common-input-field>
    <br />
    <div class="grid grid-cols-2 gap-2">
      <button class="theme-container w-full text-teal-600 theme-submit-button">
        <font-awesome-icon :icon="['fass', 'check']" />
      </button>
      <button
        class="theme-container w-full text-red-900 theme-submit-button font-bold"
        @click.prevent="closeModal"
      >
        <font-awesome-icon :icon="['fass', 'xmark']" />
      </button>
    </div>
    <common-label-message-alert
      :show="showMessage.showError"
      :message="showMessage.message"
      type="error"
      @onStateChange="
        showMessage = {
          showError: false,
          message: '',
        }
      "
    ></common-label-message-alert>
  </form>
</template>
