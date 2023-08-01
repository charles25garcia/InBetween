<script setup lang="ts">
import { FieldTypeEnum } from "~/@shared/enums";
import { FieldClassModel, OutputPropsModel } from "~/@shared/models";
import { ChangePasswordModel } from "~/@shared/models/player/ChangePassword.Model";
import { ChangePasswordDTO } from "~/@core/dtos";
import { useProfileStore } from "~/stores/useProfileStore";
import Cookies from "js-cookie";

const profileStore = useProfileStore();

onMounted(() => {
  const token = useCookie("jwt").value;
  if (token) {
    profileStore.setToken(token);
  }
});

const changePasswordForm: ChangePasswordModel = {
  currentPassword: useInputField({
    displayName: "Current Password",
    required: true,
    type: FieldTypeEnum.Password,
  }),
  confirmPassword: useInputField({
    displayName: "Confirm Password",
    required: true,
    type: FieldTypeEnum.Password,
  }),
  newPassword: useInputField({
    displayName: "New Password",
    required: true,
    type: FieldTypeEnum.Password,
  }),

  fieldStates: [],
};

const showNewPassword = ref(false);
const showConfirmPassword = ref(false);

const formMessage = ref<{
  message: string;
  show: boolean;
  isError: boolean;
}>({
  message: "",
  show: false,
  isError: false,
});

const route = useRoute();

const newPasswordButtonText = computed(() =>
  showNewPassword.value ? "Hide" : "Show"
);

const confirmPasswordButtonText = computed(() =>
  showConfirmPassword.value ? "Hide" : "Show"
);

const submitForm = async () => {
  const { currentPassword, newPassword, confirmPassword } = changePasswordForm;

  if (newPassword.getValue() !== confirmPassword.getValue()) {
    formMessage.value = {
      isError: true,
      message: "New and confirm password does not match.",
      show: true,
    };

    return;
  }

  const passwords: ChangePasswordDTO = {
    currentPassword: currentPassword.getValue(),
    newPassword: newPassword.getValue(),
  };

  const userId = route.params.id.toString();

  const data: any = await profileStore.changePassword(passwords, userId);

  if (data.success) {
    formMessage.value = {
      isError: false,
      message: "Successfully changed the password",
      show: true,
    };

    setTimeout(() => {
      const { fieldStates, ...resFields } = changePasswordForm;

      Object.keys(resFields).forEach((key) => {
        changePasswordForm[key as keyof typeof resFields]?.clear();
      });
      changePasswordForm.fieldStates = [];
    }, 1000);
  } else {
    formMessage.value = {
      isError: true,
      message: data.message,
      show: true,
    };
  }
};

const toggleShowPassword = (field: string) => {
  if (field === "newPassword") {
    showNewPassword.value = !showNewPassword.value;
    changePasswordForm.newPassword.type = showNewPassword.value
      ? FieldTypeEnum.Text
      : FieldTypeEnum.Password;
  } else if (field === "confirmPassword") {
    showConfirmPassword.value = !showConfirmPassword.value;
    changePasswordForm.confirmPassword.type = showConfirmPassword.value
      ? FieldTypeEnum.Text
      : FieldTypeEnum.Password;
  }
};
function inputChange(output: OutputPropsModel): void {
  const { fieldStates, ...rest } = changePasswordForm;

  const propsId = output.id as keyof typeof rest;

  (changePasswordForm[propsId] as FieldClassModel).setValue(output.value);

  updateState(output);
}

function updateState({ id, value, valid }: OutputPropsModel): void {
  const fieldState = changePasswordForm.fieldStates.find((i) => i.id === id);
  if (fieldState) {
    fieldState.valid = valid;
  } else {
    changePasswordForm.fieldStates.push({
      id,
      valid,
    });
  }
}
</script>

<template>
  <div class="flex flex-col justify-center py-12 sm:px-6 lg:px-8">
    <div class="mt-8 sm:mx-auto sm:w-full sm:max-w-2xl">
      <div
        class="py-8 px-4 shadow sm:rounded-lg sm:px-10 common-bg theme-border-color border"
      >
        <div>
          <h2 class="mt-6 text-3xl text-white">Change Password</h2>
          <p class="mt-2 text-sm text-gray-600">
            Enter your current and new password.
          </p>
        </div>

        <form class="space-y-6 mt-8" @submit.prevent="submitForm">
          <p
            v-if="formMessage.show"
            :class="formMessage.isError ? 'text-red-400' : 'text-green-400'"
            class="text-sm h-fit text-center mt-3"
          >
            {{ formMessage.message }}
          </p>
          <div>
            <div class="mt-1">
              <common-input-field
                :input-field="changePasswordForm.currentPassword"
                @change-input="inputChange"
              ></common-input-field>
            </div>
          </div>

          <div>
            <div class="relative mt-1">
              <common-input-field
                :input-field="changePasswordForm.newPassword"
                @change-input="inputChange"
                :type="
                  showNewPassword ? FieldTypeEnum.Text : FieldTypeEnum.Password
                "
              ></common-input-field>
              <div class="absolute inset-y-0 right-0 pr-3 flex items-center">
                <label
                  for="show-new-password"
                  @click="toggleShowPassword('newPassword')"
                  class="ml-2 text-sm text-gray-600 cursor-pointer"
                >
                  {{ newPasswordButtonText }}
                </label>
              </div>
            </div>
          </div>

          <div>
            <div class="relative mt-1">
              <common-input-field
                :input-field="changePasswordForm.confirmPassword"
                @change-input="inputChange"
                :type="
                  showConfirmPassword
                    ? FieldTypeEnum.Text
                    : FieldTypeEnum.Password
                "
              ></common-input-field>
              <div class="absolute inset-y-0 right-0 pr-3 flex items-center">
                <label
                  for="show-confirm-password"
                  @click="toggleShowPassword('confirmPassword')"
                  class="ml-2 text-sm text-gray-600 cursor-pointer"
                >
                  {{ confirmPasswordButtonText }}
                </label>
              </div>
            </div>
          </div>

          <button
            type="submit"
            class="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
          >
            Submit
          </button>
          <button
            type="button"
            @click="navigateTo('/player/profile')"
            class="ml-4 inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
          >
            Cancel
          </button>
        </form>
      </div>
    </div>
  </div>
</template>

<style scoped>
.common-bg {
  background-color: #1d1d1d;
}
</style>
