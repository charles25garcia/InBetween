<script setup lang="ts">
import { FieldTypeEnum } from "~/@shared/enums";
import Cookies from "js-cookie";
import { useProfileStore } from "~/stores/useProfileStore";
import {
  FieldClassModel,
  OutputPropsModel,
  InputProfileModel,
} from "~/@shared/models";
import { UpdateProfileDTO } from "~/@core/dtos";

const profileStore = useProfileStore();

const editing = ref(false);
const isConfirmed = ref(false);
const isConfirmationModalOpen = ref(false);
const message = ref("");
const isSuccess = ref(false);

const profileForm: InputProfileModel = {
  accountName: useInputField({
    displayName: "Account Name",
    required: true,
    type: FieldTypeEnum.Text,
    value: profileStore.userProfile.fullName,
  }),
  email: useInputField({
    displayName: "Email",
    required: true,
    type: FieldTypeEnum.Email,
    value: profileStore.userProfile.email,
  }),
  contactNo: useInputField({
    displayName: "Contact Number",
    required: true,
    type: FieldTypeEnum.Number,
    value: profileStore.userProfile.contactNo,
  }),
  username: useInputField({
    displayName: "Username",
    required: true,
    type: FieldTypeEnum.Text,
    value: profileStore.userProfile.username,
  }),

  fieldStates: [],
};

const submitForm = async () => {
  if (editing.value) {
    if (isConfirmed.value) {
      try {
        const { accountName, email, contactNo, username } = profileForm;
        const profileDetails: UpdateProfileDTO = {
          fullName: accountName.getValue(),
          email: email.getValue(),
          contactNo: contactNo.getValue(),
          username: username.getValue(),
        };

        const data: any = await profileStore.updateUserProfile(
          profileDetails,
          profileStore.userProfile.id
        );

        Cookies.remove("jwt");
        Cookies.set("jwt", data.accessToken, { expires: 7 });
        profileStore.setToken(data.accessToken);

        isConfirmed.value = false;
        isConfirmationModalOpen.value = false;
        editing.value = false;
        message.value = data.message;
        isSuccess.value = data.success;

        await profileStore.fetchUserProfile();
      } catch (err: any) {
        console.log(err.response);
      }
    } else {
      isConfirmationModalOpen.value = true;
    }
  } else {
    editing.value = true;
  }
};

function inputChange(output: OutputPropsModel): void {
  const { fieldStates, ...rest } = profileForm;

  const propsId = output.id as keyof typeof rest;

  (profileForm[propsId] as FieldClassModel)?.setValue(output.value);

  updateState(output);
}

function updateState({ id, value, valid }: OutputPropsModel): void {
  const fieldState = profileForm.fieldStates.find((i) => i.id === id);
  if (fieldState) {
    fieldState.valid = valid;
  } else {
    profileForm.fieldStates.push({
      id,
      valid,
    });
  }
}
</script>

<template>
  <div class="flex flex-col justify-center items-center text-white">
    <div class="sm:mx-auto sm:w-full sm:max-w-2xl">
      <div
        class="py-8 px-4 shadow sm:rounded-lg sm:px-10 common-bg theme-border-color border"
      >
        <div>
          <h2 class="mt-6 text-4xl text-white">Player Profile</h2>
        </div>

        <form class="space-y-6 mt-16" @submit.prevent="submitForm">
          <p
            :class="isSuccess ? 'text-green-400' : 'text-red-400'"
            class="text-sm h-fit text-center mt-3"
          >
            {{ message }}
          </p>

          <div class="flex justify-between">
            <label>Account Name:</label>
            <div v-if="!editing">
              <p>{{ profileStore.userProfile.fullName }}</p>
            </div>
            <div class="h-10 -mt-8" v-else>
              <common-input-field
                :input-field="profileForm.accountName"
                @change-input="inputChange"
              ></common-input-field>
            </div>
          </div>

          <div class="flex justify-between">
            <label>Email:</label>
            <div v-if="!editing">
              <p>{{ profileStore.userProfile.email }}</p>
            </div>
            <div class="h-10 -mt-8" v-else>
              <common-input-field
                :input-field="profileForm.email"
                @change-input="inputChange"
              ></common-input-field>
            </div>
          </div>

          <div class="flex justify-between">
            <label>Contact Number:</label>
            <div v-if="!editing">
              <p>{{ profileStore.userProfile.contactNo }}</p>
            </div>
            <div class="h-10 -mt-8" v-else>
              <common-input-field
                :input-field="profileForm.contactNo"
                @change-input="inputChange"
              ></common-input-field>
            </div>
          </div>

          <div class="flex justify-between">
            <label>Username:</label>
            <div v-if="!editing">
              <p>{{ profileStore.userProfile.username }}</p>
            </div>
            <div v-else class="h-10 -mt-8">
              <common-input-field
                :input-field="profileForm.username"
                @change-input="inputChange"
              ></common-input-field>
            </div>
          </div>

          <div class="flex justify-between">
            <label>Role:</label>

            <p>{{ profileStore.userProfile.userRole.roleDescription }}</p>
          </div>

          <div class="mt-4 flex" v-if="!editing">
            <button
              @click="navigateTo(`changepassword/${user?.id}`)"
              type="button"
              class="inline-flex items-center justify-center py-2 px-4 w-40 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
            >
              Change Password
            </button>
          </div>

          <div class="mt-4 flex">
            <button
              @click="editing ? submitForm() : (editing = true)"
              :type="editing ? 'button' : 'submit'"
              :class="{ 'mt-2': editing }"
              class="inline-flex items-center justify-center py-2 px-4 w-40 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
            >
              {{ editing ? "Save Changes" : "Edit Profile" }}
            </button>
          </div>

          <div class="mt-2 flex" v-if="editing">
            <button
              @click="editing = false"
              type="button"
              class="inline-flex items-center justify-center py-2 px-4 w-40 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
            >
              Cancel
            </button>
          </div>
        </form>

        <common-confirmation-modal
          v-if="isConfirmationModalOpen"
          confirmation-message="Are you sure you want to submit the form?"
          @confirm="
            isConfirmed = true;
            submitForm();
          "
          @cancel="isConfirmationModalOpen = false"
        />
      </div>
    </div>
  </div>
</template>

<style scoped>
.common-bg {
  background-color: #1d1d1d;
}
</style>
