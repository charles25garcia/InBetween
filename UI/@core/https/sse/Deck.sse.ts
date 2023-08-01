export class DeckSse {
  static mainSse(userId: string) {
    return new EventSource(`${this.getSseUrl()}/main-sse/${userId}`);
  }

  private static getSseUrl(): string {
    const { $runtimeConfig } = useNuxtApp() as any;
    return (
      $runtimeConfig.public.api.baseUrl + $runtimeConfig.public.api.SSE.url
    );
  }
}
