<script lang="ts" setup>
const router = useRouter();

const { $features } = useNuxtApp() as any;

function goToPrev() {
  const defaultPage = $features.value.find(i => i.featureName.toLowerCase() === 'dashboard');

  router.replace(`${defaultPage.featurePage}?featureId=${defaultPage.id}`);
}
</script>

<template>
  <div class="flex flex-col h-full justify-between">
    <div>
      <layout-header></layout-header>
    </div>
    <div class="body duration-300 relative p-2 theme-background">
      <nuxt-link
        @click="goToPrev"
        class="text-white ml-5 mt-2 theme-hover-text-item cursor-pointer"
      >
        <font-awesome-icon :icon="['fass', 'arrow-left']" /> Exit</nuxt-link
      >
      <slot />
    </div>
    <layout-footer class="w-full duration-300"></layout-footer>
  </div>
</template>
