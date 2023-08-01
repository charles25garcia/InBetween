<script setup lang="ts">
import Cookies from "js-cookie";
import { useProfileStore } from "~/stores/useProfileStore";

const profileStore = useProfileStore();

const playerInitial = computed(() => {
  return getInitials(profileStore.userProfile?.fullName || "");
});

const getInitials = (fullName: string): string => {
  const names = fullName.split(" ");
  const initials = names.reduce((acc: string, name: string, index: number) => {
    if (index === 0 || index === names.length - 1) {
      acc += name.charAt(0).toUpperCase();
    }
    return acc;
  }, "");
  return initials;
};
</script>

<template>
  <nuxtLink to="/player/profile">
    <div class="avatar-container ml-2 grid place-items-center">
      <h1>{{ playerInitial }}</h1>
    </div>
  </nuxtLink>
</template>

<style lang="sass" scoped>
@import "@/assets/sass/global-variable-colors"
.avatar-container
    width: 40px
    height: 40px
    background-color: $global-border-color
    border-radius: 50%
    font-weight: bold
    font-size: 14px
    text-align: center
    cursor: pointer
    color: white
    &:hover
        background-color: $global-hovered-border-color
</style>
