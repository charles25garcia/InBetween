<script lang="ts" setup>
const { $sidebar } = useNuxtApp() as any;
</script>

<template>
  <div class="flex flex-col">
    <layout-header
      :class="
        $sidebar.isOpen.value
          ? 'left-container-opened'
          : 'w-[100%] left-[0%] pl-16'
      "
    ></layout-header>
    <layout-sidebar />
    <div
      :class="
        $sidebar.isOpen.value
          ? 'left-container-opened'
          : 'w-[100%] left-[0%] pl-16'
      "
      class="body duration-300 relative p-10 h-[100%]"
    >
      <slot />
    </div>
    <layout-footer
      :class="
        $sidebar.isOpen.value
          ? 'left-container-opened'
          : 'w-[100%] left-[0%] pl-16'
      "
      class="duration-300 h-[2rem] absolute"
    ></layout-footer>
  </div>
</template>
<style lang="sass" setup>
.left-container-opened
  width: calc( 100% - 16rem )
  left: 16rem
</style>