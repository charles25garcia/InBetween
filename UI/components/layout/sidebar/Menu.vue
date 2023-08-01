<script lang="ts" setup>
import Cookies from "js-cookie";
import { UserFeaturesStateModel } from "~/@core/models";
import { useProfileStore } from "~/stores/useProfileStore";

const { features } = defineProps<{
  features: UserFeaturesStateModel[];
}>();
const $sidebar = useNuxtApp().$sidebar as any;

const profileStore = useProfileStore();

const router = useRouter();
const activeMenu = ref(features[0].id);

watch(
  () => $sidebar.activePageId.value,
  () => {
    setActiveMenu($sidebar.activePageId.value);
  }
);

setActiveMenu($sidebar.activePageId.value);
function setActiveMenu(id: number) {
  activeMenu.value = id;
}

function logout() {
  Cookies.remove("jwt");
  Cookies.remove("userRole");
  Cookies.remove("userId");
  router.push("/user/signin");
  profileStore.clearUserProfile();
}
</script>

<template>
  <ul v-for="feature in features" :key="feature.id" class="space-y-1 text-sm">
    <li class="rounded-sm features">
      <layout-sidebar-menu-item
        :activeMenu="activeMenu"
        @set-active-menu="setActiveMenu"
        :feature="feature"
      ></layout-sidebar-menu-item>
    </li>
  </ul>

  <ul class="space-y-1 text-sm">
    <li class="rounded-sm features">
      <NuxtLink
        @click="logout"
        class="flex items-center p-2 space-x-3 rounded-md text-white hover:bg-yellow-800"
      >
        <font-awesome-icon :icon="['fass', 'right-from-bracket']" />
        <span class="text-gray-100">Logout</span>
      </NuxtLink>
    </li>
  </ul>
</template>

<style lang="sass" scoped>
.features
    svg
        height: 1.3rem


@media screen and (max-width: 880px)
    span
        display: none !important

@media screen and (max-width: 780px)
    .features
        ul
            margin-left: 0
</style>
