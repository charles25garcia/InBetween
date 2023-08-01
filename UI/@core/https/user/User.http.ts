import { CreateUserDto } from "~/@core/dtos/user/CreateUser.dto";
import {
  LoginUserDto,
  UpdateProfileDTO,
  ChangePasswordDTO,
} from "~/@core/dtos";
import { ProfileModel } from "~/@shared/models";
export class UserHttp {
  static register(user: CreateUserDto) {
    return $fetch(`${this.getUrl()}/registerplayer`, {
      method: "POST",
      body: user,
      headers: {
        "Content-Type": "application/json",
      },
    });
  }

  static signin(user: LoginUserDto) {
    return $fetch(`${this.getUrl()}/signin`, {
      method: "POST",
      body: user,
      headers: {
        "Content-Type": "application/json",
      },
    });
  }

  static blockUser(username: string) {
    return $fetch(`${this.getUrl()}/block/${username}`, {
      method: "PUT",
    });
  }

  static updateLoginAttempt(username: string) {
    return $fetch(`${this.getUrl()}/loginattempt/${username}`, {
      method: "PUT",
    });
  }

  static async userProfile() {
    const { data } = await $fetch<{ data: ProfileModel }>(
      `${this.getUrl()}/getuser`,
      {
        method: "GET",
      }
    );

    return data;
  }

  static async updateProfile(profile: UpdateProfileDTO, userId: string) {
    return $fetch(`${this.getUrl()}/updateprofile/${userId}`, {
      method: "PUT",
      body: profile,
      headers: {
        "Content-Type": "application/json",
      },
    });
  }

  static async changePassword(passwords: ChangePasswordDTO, userId: string) {
    return $fetch(`${this.getUrl()}/changepassword/${userId}`, {
      method: "PATCH",
      body: passwords,
      headers: {
        "Content-Type": "application/json",
      },
    });
  }

  static updateShowMechanics(userId: string) {
    return $fetch(`${this.getUrl()}/updateshowmechanics/${userId}`, {
      method: "PATCH",
    });
  }

  static getReferrals(referralId: string) {
    return $fetch(`${this.getUrl()}/getreferrals/${referralId}`, {
      method: "GET",
    });
  }

  static promoteUsers(usersId: Array<string>) {
    return $fetch(`${this.getUrl()}/promoteusers`, {
      method: "PUT",
      body: { usersId },
      headers: {
        "Content-Type": "application/json",
      },
    });
  }

  private static getUrl(): string {
    const { $runtimeConfig } = useNuxtApp() as any;
    return (
      $runtimeConfig.public.api.baseUrl + $runtimeConfig.public.api.user.url
    );
  }
}
