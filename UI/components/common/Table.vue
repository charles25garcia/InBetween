<script setup lang="ts">
import "vue3-easy-data-table/dist/style.css";
import type { Header, Item } from "vue3-easy-data-table";
import Vue3EasyDataTable from "vue3-easy-data-table";
import exportFromJSON from "export-from-json";
import dayjs from "dayjs";

const props = defineProps<{
  items: any[];
  rowItems?: number[];
  isLoading?: boolean;
  hideSearch?: boolean;
  showCheckBox?: boolean;
  exportFileName?: string;
  hideExport?: boolean;
  height?: number;
  useDefaultColor?: boolean;
}>();
const emitters = defineEmits(["refresh", "updateSelected"]);

const headers = ref<Header[]>([]);
const searchValue = ref("");
const itemsSelected = ref<Item[] | undefined>(
  props.showCheckBox ? [] : undefined
);

let rowItems: number[] = [25, 50, 75, 100];

watch(
  () => props.items,
  () => {
    headers.value = Object.keys(props.items[0] || []).map(
      (i) =>
        ({
          text: CamelCaseToTitle(i),
          value: i,
          sortable: i.length > 0,
        } as Header)
    );
    itemsSelected.value = props.showCheckBox ? [] : undefined;
  }
);

if (props.rowItems && props.rowItems.length > 0) {
  rowItems = props.rowItems;
}

const handleItemsSelectedUpdate = (newItemsSelected: any) => {
  emitters("updateSelected", newItemsSelected);
};
function getItemsWithTitleHeader() {
  const data: any = [];

  const excelHeader = headers.value.map((i) => i.text);
  const itemFields = Object.keys(props.items[0]);

  type Type = (typeof props.items)[0];

  props.items.forEach((itm) => {
    const result: Type = excelHeader.reduce((r, key: string, index) => {
      if (key === "ACTION") {
        return { ...r };
      }
      return { ...r, [key]: itm[itemFields[index]] || "" };
    }, {} as Type);

    data.push(result);
  });

  return data;
}

function exportToExcel() {
  exportFromJSON({
    data: getItemsWithTitleHeader(),
    fileName: `${props.exportFileName || "InBetweenExportedFile"}_${dayjs(
      new Date()
    ).format("YYYY-MM-DD")}`,
    exportType: "csv",
  });
}
</script>
<template>
  <div class="grid grid-cols-2 gap-2">
    <div class="relative" v-if="!hideSearch">
      <input
        type="text"
        id="txtSearch"
        class="theme-border-color w-72 block p-2 w-full text-sm bg-transparent rounded-s border appearance-none dark:text-white dark:focus:theme-border-color focus:outline-none focus:ring-0 focus:theme-border-color peer"
        placeholder=" "
        v-model="searchValue"
      />
      <label
        for="txtSearch"
        id="tableSearch"
        :class="useDefaultColor ? 'common-bg' : ''"
        class="absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-4 global-container-bg scale-75 top-2 z-10 origin-[0] dark:bg-gray-900 px-2 peer-focus:px-2 peer-focus:text-gray-600 peer-focus:dark:text-gray-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-4 left-1"
        >Search here...</label
      >
    </div>
    <div class="relative">
      <div class="absolute right-0">
        <button
          class="theme-submit-button theme-container w-10 h-full text-amber-400 m-2"
          :disabled="isLoading"
          v-show="!hideExport"
          @click="exportToExcel"
        >
          <font-awesome-icon :icon="['fass', 'file-excel']" />
        </button>
        <button
          class="theme-submit-button theme-container w-10 h-full text-teal-600"
          :disabled="isLoading"
          @click="emitters('refresh')"
        >
          <font-awesome-icon :icon="['fass', 'arrows-rotate']" />
        </button>
      </div>
    </div>
  </div>
  <Vue3EasyDataTable
    v-model:items-selected="itemsSelected"
    :headers="headers"
    :items="props.items"
    table-class-name="common-table theme-border-color theme-background text-white mt-2"
    :rows-items="rowItems"
    :rows-per-page="rowItems[0]"
    :table-height="height || 400"
    body-text-direction="left"
    header-text-direction="left"
    buttons-pagination
    border-cell
    theme-color="#a67b47"
    :loading="props.isLoading"
    :search-value="searchValue"
    @update:items-selected="handleItemsSelectedUpdate"
  >
    <template #loading>
      <common-spinner></common-spinner>
    </template>
    <template #item-action="item">
      <slot name="actionSlot" :item="item" />
    </template>
  </Vue3EasyDataTable>
</template>
<style lang="sass" scoped>
@import "@/assets/sass/global-variable-colors"

.common-bg
  background-color: $global-background-color-v1 !important
.common-table
    color: white !important
    --easy-table-row-border: 1px solid #a67b47

    --easy-table-header-font-color: #fff
    --easy-table-header-background-color: #2c2b2b

    --easy-table-body-row-background-color: $global-background-color-v1
    --easy-table-body-row-font-color: #fff
    --easy-table-body-row-hover-background-color: #ab9958

    --easy-table-footer-background-color: $global-background-color-v1
    --easy-table-footer-font-color: #fff
</style>
