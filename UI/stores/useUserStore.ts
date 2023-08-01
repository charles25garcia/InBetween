import { defineStore } from "pinia";
import {
  EndpointResponseDto,
  CreateUserDto,
  LoginUserDto,
  CreatePlatinumUserDto,
} from "~/@core/dtos";
import { AdminHttp, UserHttp, UserRoleHttp } from "~/@core/https";
import { UserFeaturesStateModel, UserStateModel } from "~/@core/models";

export const useUserStore = defineStore("user", {
  state: (): {
    user?: UserStateModel;
    features: UserFeaturesStateModel[];
  } => ({
    user: undefined,
    features: [],
  }),
  actions: {
    async registerPlayer(user: CreateUserDto): Promise<EndpointResponseDto> {
      const res = await UserHttp.register(user);
      return res as EndpointResponseDto;
    },

    async signInUser(user: LoginUserDto) {
      const response = (await UserHttp.signin(user)) as any;

      return response;
    },

    async blockUser(username: string) {
      await UserHttp.blockUser(username).catch((error) => {
        console.log(error);
      });
    },

    async updateLoginAttempt(username: string) {
      const loginAttempt = (await UserHttp.updateLoginAttempt(
        username
      )) as number;

      return loginAttempt;
    },

    async userFeaturesAsync(roleId: number): Promise<UserFeaturesStateModel[]> {
      const res = (await UserRoleHttp.getFeatures(
        roleId
      )) as EndpointResponseDto;

      this.features = res.data;
      return res.data as UserFeaturesStateModel[];
    },

    async registerPlatinumUser(platinumDto: CreatePlatinumUserDto) {
      const res = (await AdminHttp.registerPlatinum(
        platinumDto
      )) as EndpointResponseDto;
      return res;
    },

    async updateShowMechanics(userId: string) {
      await UserHttp.updateShowMechanics(userId).catch((error) => {
        console.log(error);
      });
    },

    async getReferrals(referralsId: string) {
      const res = (await UserHttp.getReferrals(
        referralsId
      )) as EndpointResponseDto;
      return res.data;
    },

    async getUsers() {
      const users = await AdminHttp.getUsers();
      return users.sort((a, b) => new Date(b.dateOfRegistration).getTime() - new Date(a.dateOfRegistration).getTime());
    },

    async promoteUsers(usersId: Array<string>) {
      await UserHttp.promoteUsers(usersId).catch((error) => {
        console.log(error);
      });
    },

    async addStats(
      userId: string,
      adminPassword: string,
      points: number,
      chips: number
    ) {
      await AdminHttp.addStats({
        userId,
        adminPassword,
        points,
        chips,
      });
    },

    async manualWithdrawal(
      userId: string,
      adminPassword: string,
      commissionAmount: number,
      chips: number
    ) {
      await AdminHttp.manualWithdrawal({
        userId,
        adminPassword,
        commissionAmount,
        chips,
      });
    },
  },
  getters: {
    userFeatures: (state): UserFeaturesStateModel[] => {
      return state.features;
    },
  },
});
