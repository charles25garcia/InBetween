export class UserRoleHttp {
  static getFeatures(roleId: number) {
    return $fetch(`${this.getUrl()}/role/${roleId}`);
  }

  static getUrl(): string {
    const { $runtimeConfig } = useNuxtApp() as any;
    return (
      $runtimeConfig.public.api.baseUrl +
      $runtimeConfig.public.api.roleFeature.url
    );
  }
}
