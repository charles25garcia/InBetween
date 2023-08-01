export class GameHistoryHttp {
  static getHistories() {
    return $fetch(`${this.getUrl()}/get-histories`);
  }

  static getUrl(): string {
    const runtimeConfig = useRuntimeConfig();
    return (
      runtimeConfig.public.api.baseUrl +
      runtimeConfig.public.api.gameHistory.url
    );
  }
}
