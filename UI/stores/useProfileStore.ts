import Cookies from "js-cookie";
import { defineStore } from "pinia";
import { ref } from "vue";
import {
  ChangePasswordDTO,
  EndpointResponseDto,
  UpdateProfileDTO,
} from "~/@core/dtos";
import { UserHttp } from "~/@core/https";
import { ProfileModel } from "~/@shared/models";

export const useProfileStore = defineStore("profile", () => {
  const userProfileInitValue: ProfileModel = {
    id: "",
    referralId: "",
    fullName: "",
    email: "",
    contactNo: "",
    username: "",
    showMechanics: false,
    referralById: "",
    userRole: {
      id: 0,
      roleDescription: "",
      defaultFeatureId: 0,
      defautlFeature: { featurePage: "" },
    },
    userStats: { points: 0, chips: 0 },
    commission: {
      amount: 0,
    },
  };
  const userProfile = ref<ProfileModel>(userProfileInitValue);

  const token = ref<string>("");

  const setToken = (newToken: string) => {
    token.value = newToken;
    Cookies.set("jwt", newToken); // set the token in the cookie
  };

  const fetchUserProfile = async () => {
    userProfile.value = await UserHttp.userProfile();
  };

  const updateUserProfile = async (
    profile: UpdateProfileDTO,
    userId: string
  ): Promise<EndpointResponseDto> => {
    const { data } = (await UserHttp.updateProfile(
      profile,
      userId
    )) as EndpointResponseDto;
    return data;
  };

  const changePassword = async (
    passwords: ChangePasswordDTO,
    userId: string
  ) => {
    const { data } = (await UserHttp.changePassword(
      passwords,
      userId
    )) as EndpointResponseDto;

    return data;
  };

  const clearUserProfile = () => {
    token.value = "";
    userProfile.value = userProfileInitValue;
  };

  return {
    userProfile,
    token,
    setToken,
    fetchUserProfile,
    updateUserProfile,
    changePassword,
    clearUserProfile,
  };
});
