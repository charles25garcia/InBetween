<script lang="ts" setup>
import { CreatePlatinumUserDto } from "~/@core/dtos";
import { ApiResultModel } from "~/@shared/models";
import { useUserStore } from "~/stores";

const emit = defineEmits(["updateUser"]);

const isLoading = ref(false);
const registrationResult = ref<ApiResultModel>();

const userStore = useUserStore();
const initRegistraionResultValue: ApiResultModel = {
  haveError: false,
  message: "",
  show: false,
};

const fullnameInput = useInputField({
  id: "fullname",
  displayName: "Fullname",
  type: "text",
  required: true,
  value: "",
});
const usernameInput = useInputField({
  id: "username",
  displayName: "Username",
  type: "text",
  required: true,
  value: "",
});
const emailInput = useInputField({
  id: "email",
  displayName: "Email",
  type: "email",
  required: true,
  value: "",
});

watch(registrationResult, () => {
  setTimeout(() => {
    registrationResult.value = initRegistraionResultValue;
  }, 3000);
});

async function registerPlatinum() {
  if (
    !fullnameInput.validate().valid ||
    !usernameInput.validate().valid ||
    !emailInput.validate().valid
  ) {
    return;
  }

  isLoading.value = true;
  const platinumDto = {
    fullName: fullnameInput.getValue(),
    username: usernameInput.getValue(),
    email: emailInput.getValue(),
  } as CreatePlatinumUserDto;

  try {
    const newPlatinumUser = await userStore.registerPlatinumUser(platinumDto);

    registrationResult.value = {
      message: "Added Successfully",
      haveError: false,
      show: true,
    };
    updateUsers();
    reset();
  } catch {
    registrationResult.value = {
      message: "Failed to add new Platinum User",
      haveError: true,
      show: true,
    };
  }
  isLoading.value = false;
}

function reset() {
  fullnameInput.clear();
  usernameInput.clear();
  emailInput.clear();
}

function updateUsers() {
  emit("updateUser");
}
</script>
<template>
  <h2>Add Platinum User:</h2>
  <form @submit.prevent="registerPlatinum">
    <div class="grid grid-cols-3 gap-2">
      <common-input-field :inputField="fullnameInput"></common-input-field>
      <common-input-field :inputField="usernameInput"></common-input-field>
      <common-input-field :inputField="emailInput"></common-input-field>
    </div>
    <div class="w-full flex justify-center">
      <div class="grid grid-cols-2 gap-4 px-40 w-2/5">
        <button
          class="mt-6 theme-submit-button  theme-container w-full text-teal-600 rounded-md"
        >
          <common-spinner v-if="isLoading"></common-spinner>

          <font-awesome-icon v-else :icon="['fass', 'check']" />
        </button>
        <button
          class="mt-6 theme-submit-button theme-container w-full text-red-900 rounded-md"
          @click.prevent="reset"
          :disabled="isLoading"
        >
          <font-awesome-icon :icon="['fass', 'arrows-rotate']" />
        </button>
      </div>
    </div>
    <p
      v-if="registrationResult?.show"
      :class="registrationResult?.haveError ? 'text-red-400' : 'text-green-400'"
      class="text-sm h-fit text-center mt-3"
    >
      {{ registrationResult.message }}
    </p>
  </form>
</template>
<style lang="sass" scoped></style>
