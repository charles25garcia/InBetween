<script setup lang="ts">
import { LoginUserDto } from "~/@core/dtos";
import { FieldTypeEnum } from "~/@shared/enums";
import {
  FieldClassModel,
  OutputPropsModel,
  SigninFormModel,
} from "~/@shared/models";
import { useUserStore } from "~/stores/useUserStore";
import Cookies from "js-cookie";
import { useProfileStore } from "~/stores/useProfileStore";
import { profile } from "console";
import { RoleLadingPages } from "~/@shared/constants";

definePageMeta({
  layout: "unauthorized-layout",
});

const profileStore = useProfileStore();

const { $userId, $userRole } = useNuxtApp();

const showPassword = ref(false);
const errorMessage = ref("");

const passwordButtonText = computed(() =>
  showPassword.value ? "Hide" : "Show"
);
const inputType = computed(() =>
  showPassword.value ? FieldTypeEnum.Text : FieldTypeEnum.Password
);

const isLoading = ref(false);

const signinForm: SigninFormModel = {
  username: useInputField({
    displayName: "Username",
    required: true,
    type: FieldTypeEnum.Text,
  }),
  password: useInputField({
    displayName: "Password",
    required: true,
    type: inputType.value,
  }),
  fieldStates: [],
};

function inputChange(output: OutputPropsModel): void {
  const { fieldStates, ...rest } = signinForm;

  const propsId = output.id as keyof typeof rest;

  (signinForm[propsId] as FieldClassModel).setValue(output.value);

  updateState(output);
}

function updateState({ id, value, valid }: OutputPropsModel): void {
  const fieldState = signinForm.fieldStates.find((i) => i.id === id);
  if (fieldState) {
    fieldState.valid = valid;
  } else {
    signinForm.fieldStates.push({
      id,
      valid,
    });
  }
}

const submitForm = async () => {
  isLoading.value = true;
  const { username, password } = signinForm;
  const userDetails: LoginUserDto = {
    username: username.getValue(),
    password: password.getValue(),
  };

  try {
    const response = await useUserStore().signInUser(userDetails);

    const { success, accessToken, isActive, message, userExist, userRole } =
      response.data;

    if (success) {
      if (isActive) {
        errorMessage.value = "";

        Cookies.set("jwt", accessToken, { expires: 7 });

        profileStore.setToken(accessToken);

        await profileStore.fetchUserProfile();

        const landingPage = `/${profileStore.userProfile.userRole.defautlFeature.featurePage}?featureId=${profileStore.userProfile.userRole.defaultFeatureId}`;
        Cookies.set(
          "userRole",
          profileStore.userProfile.userRole.id.toString()
        );

        Cookies.set("landingPage", landingPage);

        if (userRole === 4) {
          navigateTo("/game");
          isLoading.value = false;
          return;
        }

        navigateTo(landingPage, { replace: true });
        isLoading.value = false;
        return;
      }
      errorMessage.value = "This user has been blocked";
      isLoading.value = false;
      return;
    } else {
      if (!userExist) {
        errorMessage.value = message;
        isLoading.value = false;
        return;
      }

      if (!isActive) {
        errorMessage.value = "This user has been blocked";
        isLoading.value = false;
        return;
      }

      const response: any = await useUserStore().updateLoginAttempt(
        username.getValue()
      );

      const loginAttempt = response.data;

      if (loginAttempt >= 3) {
        await useUserStore().blockUser(username.getValue());
        errorMessage.value = "This user has been blocked";
        isLoading.value = false;
        return;
      } else {
        errorMessage.value = `${message} \n
                              ${3 - loginAttempt} login attempts remaining`;
        isLoading.value = false;
        return;
      }
    }
  } catch (error: any) {
    // const { response } = error;
    // const { _data } = response;
    // const { statusCode, message, userExist, isActive } = _data;

    // if (statusCode === 401) {
    //   if (!userExist) {
    //     errorMessage.value = message;
    //     return;
    //   }

    //   if (!isActive) {
    //     errorMessage.value = "This user has been blocked";
    //     return;
    //   }

    //   const loginAttempt = await useUserStore().updateLoginAttempt(
    //     username.getValue()
    //   );

    //   if (loginAttempt >= 3) {
    //     await useUserStore().blockUser(username.getValue());
    //     errorMessage.value = "This user has been blocked";
    //     return;
    //   } else {
    //     errorMessage.value = `${message} \n
    //                           ${3 - loginAttempt} login attempts remaining`;
    //     return;
    //   }
    // }

    errorMessage.value = "There is an error logging in";
    isLoading.value = false;
  }
};

const toggleShowPassword = () => {
  showPassword.value = !showPassword.value;
  signinForm.password.type = inputType.value;
};
</script>

<template>
  <div class="flex flex-col justify-center py-12 sm:px-6 lg:px-8">
    <div class="mt-8 sm:mx-auto sm:w-full sm:max-w-2xl">
      <div
        class="py-8 px-4 shadow sm:rounded-lg sm:px-10 common-bg theme-border-color border"
      >
        <div>
          <h2 class="mt-6 text-3xl text-white">Sign in</h2>
          <p class="mt-2 text-sm text-gray-600">
            Enter your username and password.
          </p>
        </div>

        <form class="space-y-6 mt-8" @submit.prevent="submitForm">
          <div v-if="errorMessage">
            <p class="text-red-600 text-sm">{{ errorMessage }}</p>
          </div>
          <div>
            <div class="mt-1">
              <common-input-field
                :input-field="signinForm.username"
                @change-input="inputChange"
              ></common-input-field>
            </div>
          </div>

          <div>
            <div class="relative mt-1">
              <common-input-field
                :input-field="signinForm.password"
                @change-input="inputChange"
                :type="inputType"
              ></common-input-field>
              <div class="absolute inset-y-0 right-0 pr-3 flex items-center">
                <label
                  for="password"
                  @click="toggleShowPassword"
                  class="ml-2 text-sm text-gray-600 cursor-pointer"
                >
                  {{ passwordButtonText }}
                </label>
              </div>
            </div>
          </div>

          <div class="flex items-center justify-between">
            <div class="flex items-center">
              <input
                id="remember_me"
                name="remember_me"
                type="checkbox"
                class="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
              />
              <label for="remember_me" class="ml-2 block text-sm text-white">
                Keep me logged in
              </label>
            </div>

            <div class="text-sm">
              <a href="" class="font-medium text-blue-600 hover:text-blue-500">
                Forgot your password?
              </a>
            </div>
          </div>

          <div>
            <button
              type="submit"
              :disabled="isLoading"
              class="flex py-2 px-9 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
            >
              <common-spinner v-if="isLoading"></common-spinner>
              <h2 v-else>LOGIN</h2>
            </button>
          </div>

          <div>
            <label class="text-white text-sm"> No account yet? </label>
            <NuxtLink
              to="/user/registration"
              class="text-sm text-blue-600 hover:text-blue-500"
            >
              Register here.
            </NuxtLink>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>

<style scoped lang="sass">
.common-bg
  background-color: #1d1d1d


button[disabled]
  cursor: not-allowed
  background-color: gray
</style>
