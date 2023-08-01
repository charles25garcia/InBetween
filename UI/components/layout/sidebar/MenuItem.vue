<script lang="ts" setup>
import { UserFeaturesStateModel } from "~/@core/models";

const { feature } = defineProps<{
  feature: UserFeaturesStateModel;
  activeMenu: number;
}>();

const emit = defineEmits(["setActiveMenu"]);

const isOpen = ref(true);
const childIds = feature.features.map((i) => i.id);

function setActiveMenu(id: number) {
  isOpen.value = childIds.includes(id) || !isOpen.value;

  // Do nothing if selected Item is a Parent Feature with child.
  if (feature.features.length > 0 && feature.id === id) {
    return;
  }

  emit("setActiveMenu", id);
}

function trim(str: string): string {
  return str?.replace(" ", "");
}

function getParentPageLink(): string {
  if (trim(feature.featurePage) === "" || !feature.featurePage) {
    return "";
  }

  return `/${trim(feature.featurePage)}?featureId=${feature.id}`;
}
</script>

<template>
  <NuxtLink
    :to="getParentPageLink()"
    :class="activeMenu === feature.id ? 'bg-yellow-800' : ''"
    class="flex items-center p-2 space-x-3 rounded-md text-white hover:bg-yellow-800"
    @click="setActiveMenu(feature.id)"
  >
    <font-awesome-icon :icon="['fass', feature.icon || 'folder-blank']" />
    <span class="text-gray-100">{{ feature.featureName }}</span>
  </NuxtLink>
  <ul
    v-for="level1Feature in feature.features"
    :key="level1Feature.id"
    class="space-y-1 text-sm ml-8 duration-500"
    :class="isOpen ? '' : 'closed'"
  >
    <li class="rounded-sm features">
      <NuxtLink
        :to="`/${trim(feature.featureName)}/${trim(
          level1Feature.featurePage
        )}?featureId=${level1Feature.id}`"
        :class="activeMenu === level1Feature.id ? 'bg-yellow-800' : ''"
        class="grid grid-cols-6 p-2 space-x-3 rounded-md text-white hover:bg-yellow-800"
        @click="setActiveMenu(level1Feature.id)"
      >
        <font-awesome-icon
          :icon="['fass', level1Feature.icon || 'folder-blank']"
        />
        <span class="text-gray-100">{{ level1Feature.featureName }} </span>
      </NuxtLink>
    </li>
  </ul>
</template>

<style lang="sass" scoped>
.closed
   display: none
</style>
