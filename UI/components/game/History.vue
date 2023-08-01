<script lang="ts" setup>
import "vue3-easy-data-table/dist/style.css";
import type {
  Header,
  Item,
  BodyItemClassNameFunction,
} from "vue3-easy-data-table";
import Vue3EasyDataTable from "vue3-easy-data-table";

import { useGameStore } from "~/stores/useGameStore";
import { dealTypes } from "~/@core/constants";

const props = defineProps({
  dealType: {
    type: String,
    required: true,
  },
});

const gameStore = useGameStore();

onMounted(async () => {
  await gameStore.getGameHistories();
});

const headers = ref<Header[]>([]);
const items = ref<Item[]>([]);

watch(
  () => gameStore.gameHistory,
  (newGameHistory) => {
    headers.value = [];
    items.value = [];

    if (props.dealType === dealTypes.straight) {
      headers.value = [
        { text: "DEAL #", value: "deal" },
        { text: "IN BETWEEN", value: "inbetween" },
        { text: "OUT BEYOND", value: "outbeyond" },
        { text: "PAIR", value: "pair" },
        { text: "TRIO", value: "trio" },
      ];

      newGameHistory.forEach((history: any) => {
        items.value.push({
          deal: history.dealNumber,
          inbetween: history.winning_bet === "INBETWEEN" ? "●" : "",
          outbeyond: history.winning_bet === "OUTBEYOND" ? "●" : "",
          pair: history.winning_bet === "PAIRS" ? "●" : "",
          trio: history.winning_bet === "TRIO" ? "●" : "",
        });
      });
    } else {
      headers.value = [
        { text: "DEAL #", value: "deal" },
        { text: "FIRST CARD", value: "C1" },
        { text: "MIDDLE CARD", value: "MC" },
        { text: "LAST CARD", value: "C3" },
      ];

      newGameHistory.forEach((history: any) => {
        type CardSymbols = {
          [key: string]: string;
        };

        type CardValues = {
          [key: number]: string;
        };

        const cardSymbols: CardSymbols = {
          HEART: "♥",
          SPADE: "♠",
          DIAMOND: "♦",
          FLOWER: "♣",
        };

        const cardValues: CardValues = {
          1: "A",
          11: "J",
          12: "Q",
          13: "K",
        };

        const firstCardArr = history.first_card.split(" - ");
        const middleCardArr = history.middle_card.split(" - ");
        const thirdCardArr = history.last_card.split(" - ");

        firstCardArr[1] = cardSymbols[firstCardArr[1]] || firstCardArr[1];
        middleCardArr[1] = cardSymbols[middleCardArr[1]] || middleCardArr[1];
        thirdCardArr[1] = cardSymbols[thirdCardArr[1]] || thirdCardArr[1];

        firstCardArr[0] = cardValues[firstCardArr[0]] || firstCardArr[0];
        middleCardArr[0] = cardValues[middleCardArr[0]] || middleCardArr[0];
        thirdCardArr[0] = cardValues[thirdCardArr[0]] || thirdCardArr[0];

        const firstCard = `${firstCardArr[0]}  ${firstCardArr[1]}`;
        const secondCard = `${middleCardArr[0]}  ${middleCardArr[1]}`;
        const thirdCard = `${thirdCardArr[0]}  ${thirdCardArr[1]}`;

        items.value.push({
          deal: history.dealNumber,
          C1: firstCard,
          MC: secondCard,
          C3: thirdCard,
        });
      });
    }
  }
);

const bodyItemClassNameFunction: BodyItemClassNameFunction = (
  column: string,
  rowNumber: number
): string => {
  if (column === "inbetween") return "inbetween-column";
  if (column === "outbeyond") return "outbeyond-column";
  if (column === "pair") return "pair-column";
  if (column === "trio") return "trio-column";
  if (column === "mark") return "mark-column";
  return "";
};
</script>

<template>
  <div v-if="gameStore.gameHistory.length !== 0">
    <div class="relative">
      <!-- <button
        @click="emit('close-modal')"
        class="absolute -top-5 -right-5 px-1.5 py-0.5 bg-red-500 text-white rounded text-xs"
      >
        X
      </button> -->

      <div>
        <h1 class="text-lg font-bold text-center">
          {{ props.dealType }} Deal History
        </h1>
      </div>

      <div class="flex justify-center mt-5">
        <Vue3EasyDataTable
          :headers="headers"
          :items="items"
          width="100%"
          table-class-name="history-table"
          :rows-items="[7, 10, 15]"
          :rows-per-page="7"
          :table-height="220"
          body-text-direction="center"
          header-text-direction="center"
          buttons-pagination
          theme-color="#a67b47"
          :body-item-class-name="bodyItemClassNameFunction"
        />
      </div>
    </div>
  </div>
  <div v-else>
    <div class="relative">
      <!-- <button
        @click="emit('close-modal')"
        class="absolute -top-5 -right-5 px-1.5 py-0.5 bg-red-500 text-white rounded text-xs"
      >
        X
      </button> -->

      <div class="flex items-center">
        <common-spinner class="w-30 h-30 text-white" />
        <span class="text-white">Loading...</span>
      </div>
    </div>
  </div>
</template>

<style>
.inbetween-column,
.outbeyond-column,
.trio-column,
.pair-column {
  font-size: 24px;
}

.inbetween-column {
  color: blue;
}

.outbeyond-column {
  color: red;
}

.pair-column {
  color: green;
}

.trio-column {
  color: yellow;
}

.vue3-easy-data-table {
  width: 100% !important;
}

.history-table {
  --easy-table-border: 1px solid #a67b47;
  --easy-table-row-border: 1px solid #a67b47;

  --easy-table-header-font-size: 12px;
  --easy-table-header-background-color: #a67b47;
  --easy-table-header-font-color: #fff;

  --easy-table-body-row-font-size: 12px;
  --easy-table-body-row-font-color: #fff;
  --easy-table-body-row-background-color: #1d1d1d;
  --easy-table-body-row-height: 30px;

  --easy-table-body-row-hover-font-color: #fff;
  --easy-table-body-row-hover-background-color: #a67b47;

  --easy-table-footer-font-color: #fff;
  --easy-table-footer-background-color: #1d1d1d;
  --easy-table-footer-font-size: 14px;

  /* --easy-table-rows-per-page-selector-width: 70px; */
  --easy-table-rows-per-page-selector-option-padding: 10px;
  --easy-table-rows-per-page-selector-z-index: 1;

  --easy-table-scrollbar-color: #a67b47;
  --easy-table-scrollbar-thumb-color: #1d1d1d;
  --easy-table-scrollbar-corner-color: #fff;
  --easy-table-scrollbar-track-color: #a67b47;

  --easy-table-buttons-pagination-border: 1px solid #a67b47;
}

@media (max-width: 968px) {
  .pagination__rows-per-page, .pagination__items-index {
    display: none !important;
  }
}
</style>
