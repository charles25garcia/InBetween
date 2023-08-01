<script lang="ts" setup>
import { useProfileStore } from "./stores";

useHead({
  title: "In Between",
});
const profileStore = useProfileStore();

const token = useCookie("jwt").value;
if (token) {
  profileStore.setToken(token);
  await profileStore.fetchUserProfile();

  
}
</script>

<template>
  <div class="min-h-screen theme-background relative">
    <nuxt-layout>
      <nuxt-page />
    </nuxt-layout>
  </div>
</template>
