import { ofetch } from "ofetch";
import { UserFeaturesStateModel } from "~/@core/models";
import { SidebarStateModel } from "~/@shared/models";
import { useProfileStore } from "~/stores";

export default defineNuxtPlugin(() => {
  const runtimeConfig = useRuntimeConfig();

  globalThis.$fetch = ofetch.create({
    onRequest({ options }) {
      const token = useProfileStore().token || useCookie("jwt").value;

      if (token) {
        options.headers = { Authorization: `Bearer ${token}` };
      }
    },
    onRequestError({ error }) {
      console.error(error);
    },
  });

  return {
    provide: {
      sidebar: {
        isOpen: ref(true),
        activePageId: ref(1),
      } as SidebarStateModel,
      userId: ref(""),
      runtimeConfig,
      features: ref<UserFeaturesStateModel[]>([]),
    },
  };
});
