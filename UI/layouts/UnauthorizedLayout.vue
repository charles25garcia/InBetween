<script lang="ts" setup></script>

<template>
  <div class="flex flex-col h-full justify-between">
    <div class="body duration-300 relative p-2 theme-background">
      <slot />
    </div>
    <layout-footer class="relative duration-300"></layout-footer>
  </div>
</template>
