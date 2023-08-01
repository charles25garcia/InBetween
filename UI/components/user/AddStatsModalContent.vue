<script lang="ts" setup>
import { useUserStore } from "~/stores";
import { useProfileStore } from "~/stores/useProfileStore";

const props = defineProps<{
  selectedUserId: string;
  selectedUserFullName: string;
}>();
const emitter = defineEmits(["closeModal", "updateUsers"]);

const { addStats } = useUserStore();
const {
  userProfile: { username },
} = useProfileStore();

const showMessage = ref(false);

const pointsModalInput = useInputField({
  displayName: "Points",
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

  pointsModalInput.clear();
  chipsModalInput.clear();
  passwordModalInput.clear();
}

async function submintAddStats() {
  try {
    await addStats(
      props.selectedUserId,
      passwordModalInput.getValue(),
      +pointsModalInput.getValue() || 0,
      +chipsModalInput.getValue() || 0
    );
    emitter("updateUsers");
    closeModal();
  } catch {
    showMessage.value = true;
  }
}
</script>
<template>
  <h2 class="text-center font-bold">
    Add Stats To {{ selectedUserFullName }}
  </h2>
  <form @submit.prevent="submintAddStats">
    <div class="grid grid-cols-2 gap-2">
      <common-input-field :inputField="pointsModalInput"></common-input-field>
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
      :show="showMessage"
      :message="'Invalid password'"
      type="error"
      @onStateChange="showMessage = false"
    ></common-label-message-alert>
  </form>
</template>
