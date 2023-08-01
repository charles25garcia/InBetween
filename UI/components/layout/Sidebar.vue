<script lang="ts" setup>

const { $sidebar, $features } = useNuxtApp() as any;
</script>
<template>
  <div class="flex z-50">
    <div
      :class="!$sidebar.isOpen.value ? 'closed' : 'max-w-[16rem] min-w-[16rem]'"
      class="flex flex-col h-[-webkit-fill-available] top-0 absolute px-4 py-[0.8rem] duration-300 shadow sidebar"
    >
      <div class="space-y-3">
        <div class="flex items-center justify-between text-white">
          <button @click="$sidebar.isOpen.value = !$sidebar.isOpen.value">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke-width="1.5"
              stroke="currentColor"
              class="w-6 h-6 text-white"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5"
              />
            </svg>
          </button>
        </div>
        <div v-if="$sidebar.isOpen.value" class="flex-1">
          <layout-sidebar-menu
            v-if="$features.length > 0"
            :features="$features"
          ></layout-sidebar-menu>
          <div v-else class="w-[100%] text-center">
            <common-spinner></common-spinner>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style lang="sass" scoped>
.closed
  width: 0px
  padding: 0.8rem 0px 0rem 1rem
  background-color: transparent !important
  box-shadow: none !important

.sidebar
    background-color: #654a09
</style>
