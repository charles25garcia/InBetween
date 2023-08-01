<script lang="ts" setup>
import { CreateUserDto } from "~/@core/dtos";
import { UserRoleEnum } from "~/@core/enums";
import { FieldTypeEnum } from "~/@shared/enums";
import {
  ApiResultModel,
  FieldClassModel,
  OutputPropsModel,
  RegistrationFormModel,
} from "~/@shared/models";
import { useUserStore } from "~/stores/useUserStore";

definePageMeta({
  layout: "unauthorized-layout",
});

const route = useRoute();

const referralId = route.params.referralId.toString();

const isAgree = ref(false);
const formMessage = ref<ApiResultModel>({
  message: "",
  show: false,
  haveError: false,
});

const registrationForm: RegistrationFormModel = {
  fullname: useInputField({
    displayName: "Fullname",
    required: true,
    type: FieldTypeEnum.Text,
  }),
  email: useInputField({
    displayName: "Email",
    required: true,
    type: FieldTypeEnum.Email,
  }),
  contactNo: useInputField({
    displayName: "Contact No",
    required: true,
    type: FieldTypeEnum.Number,
    maxLength: 13,
  }),
  username: useInputField({
    displayName: "Username",
    required: true,
    type: FieldTypeEnum.Text,
  }),
  password: useInputField({
    displayName: "Password",
    required: true,
    type: FieldTypeEnum.Password,
  }),
  confirmPassword: useInputField({
    displayName: "Confirm Password",
    required: true,
    type: FieldTypeEnum.Password,
  }),
  isAgreeWithConditions: useCheckboxField({
    id: "isAgreeWithConditions",
    displayName: "Do you agree to the terms and conditions?",
    checkboxValue: false,
  }),
  fieldStates: [],
};

function inputChange(output: OutputPropsModel): void {
  const { fieldStates, ...rest } = registrationForm;

  const propsId = output.id as keyof typeof rest;

  (registrationForm[propsId] as FieldClassModel).setValue(output.value);
  updateState(output);
}

function changeCheckbox(output: OutputPropsModel): void {
  inputChange(output);

  isAgree.value = output.value;
}

async function formSubmit() {
  if (registrationForm.fieldStates.some((i) => !i.valid)) {
    return;
  }
  const { fullname, email, username, contactNo, password, confirmPassword } =
    registrationForm;

  if (confirmPassword.getValue() !== password.getValue()) {
    formMessage.value = {
      haveError: true,
      message: "Password not match.",
      show: true,
    };

    return;
  }
  const newUser: CreateUserDto = {
    fullName: fullname.getValue(),
    email: email.getValue(),
    username: username.getValue(),
    contactNo: contactNo.getValue(),
    password: password.getValue(),
    lastUpdated: new Date(),
    referralById: referralId || undefined,
    roleId: UserRoleEnum.SILVER,
  };

  const res = await useUserStore().registerPlayer(newUser);

  if (res.success) {
    setTimeout(() => {
      const { fieldStates, ...resFields } = registrationForm;

      Object.keys(resFields).forEach((key) => {
        registrationForm[key as keyof typeof resFields]?.clear();
      });
      registrationForm.fieldStates = [];
    }, 1000);
  }

  formMessage.value = {
    haveError: !res.success,
    message: res.message,
    show: true,
  };
}

function updateState({ id, value, valid }: OutputPropsModel): void {
  const fieldState = registrationForm.fieldStates.find((i) => i.id === id);
  if (fieldState) {
    fieldState.valid = valid;
  } else {
    registrationForm.fieldStates.push({
      id,
      valid,
    });
  }
}
</script>

<template>
  <div class="grid place-items-center mt-10">
    <div class="w-[600px]">
      <form
        v-if="registrationForm"
        @submit.prevent="formSubmit"
        class="theme-form-bg px-8 theme-border-color border pt-6 pb-8 mb-4 text-white"
      >
        <h1 class="normal-case text-2xl">Account Registration</h1>
        <p class="text-slate-500 text-xs">Put any instructions here!</p>
        <div class="mt-6">
          <common-input-field
            :inputField="registrationForm.fullname"
            @change-input="inputChange"
          ></common-input-field>
        </div>
        <div class="mt-6">
          <common-input-field
            :inputField="registrationForm.email"
            @change-input="inputChange"
          ></common-input-field>
        </div>
        <div class="mt-6">
          <common-input-field
            :inputField="registrationForm.username"
            @change-input="inputChange"
          ></common-input-field>
        </div>
        <div class="mt-6">
          <common-input-field
            :inputField="registrationForm.contactNo"
            @change-input="inputChange"
          ></common-input-field>
        </div>
        <div class="mt-6">
          <common-input-field
            :inputField="registrationForm.password"
            @change-input="inputChange"
          ></common-input-field>
        </div>
        <div class="mt-6">
          <common-input-field
            :inputField="registrationForm.confirmPassword"
            @change-input="inputChange"
          ></common-input-field>
        </div>
        <p
          v-if="formMessage.show"
          :class="formMessage.haveError ? 'text-red-400' : 'text-green-400'"
          class="text-sm h-fit text-center mt-3"
        >
          {{ formMessage.message }}
        </p>
        <div class="mt-6 flex justify-between">
          <common-checkbox-field
            :checkbox="registrationForm.isAgreeWithConditions"
            @change-checkbox="changeCheckbox"
          ></common-checkbox-field>
          <p class="text-xs text-gray-400">
            Already registered?
            <nuxt-link
              to="/user/signin"
              class="text-blue-500 hover:text-blue-200"
              >Sign in here.
            </nuxt-link>
          </p>
        </div>

        <div class="mt-6">
          <button
            class="bg-blue-700 hover:bg-blue-700 text-white py-2 px-4 rounded disabled:bg-blue-400"
            :disabled="!isAgree"
          >
            Submit
          </button>
        </div>
      </form>
    </div>
  </div>
</template>

<style scoped>
.form-bg {
  background-color: #1d1d1d;
}
</style>
