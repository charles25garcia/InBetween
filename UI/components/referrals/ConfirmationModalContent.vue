<script lang="ts" setup>
import type { Item } from "vue3-easy-data-table";
import { useUserStore } from "~/stores";

const props = defineProps<{
  selectedUsers: any;
}>();

const userStore = useUserStore();
const router = useRouter();

const items = ref<Item[]>(
  props.selectedUsers.map((user: any) => ({
    fullName: user.fullName,
    email: user.email,
    contactNo: user.contactNo,
    username: user.username,
    role: user.userRole.roleDescription,
  }))
);

const selectedIds = props.selectedUsers.map((user: any) => user.id);

const emitter = defineEmits(["closeModal", "update"]);

function closeModal() {
  emitter("closeModal");
}

async function promoteUsers() {
  await userStore.promoteUsers(selectedIds);
  emitter("closeModal");
  emitter("update");
}
</script>

<template>
  <h2 class="text-center font-bold text-white mb-5">
    Promote this users to Gold?
  </h2>
  <!-- <div>
    <common-table :items="items" :hide-search="true" />
  </div> -->
  <div class="py-4 px-10 shadow rounded theme-border-color border mt-5">
    <h1 class="text-lg font-bold mb-5">Usernames</h1>

    <ul class="text-white list-disc" v-for="item in items" :key="item.username">
      <li>
        <p>{{ item.username }}</p>
      </li>
    </ul>
  </div>

  <div class="grid grid-cols-2 gap-2 mt-5">
    <button
      class="theme-container w-full text-teal-600 theme-submit-button"
      @click="promoteUsers"
    >
      <font-awesome-icon :icon="['fass', 'check']" />
    </button>
    <button
      class="theme-container w-full text-red-900 theme-submit-button font-bold"
      @click="closeModal"
    >
      <font-awesome-icon :icon="['fass', 'xmark']" />
    </button>
  </div>
</template>
