<script lang="ts" setup>
import { CardModel } from "~/@core/models";

defineProps<{ cardsOnDeck: CardModel[]; isResult: boolean; label: string }>();
</script>
<template>
  <div class="relative">
    <div
      v-if="isResult"
      class="absolute z-10 w-full top-1/2 left-0 bg-slate-800 opacity-90"
    >
      <h1 class="text-center text-5xl">
        {{ label }}
      </h1>
    </div>
    <div class="grid grid-cols-3 gap-2">
      <game-open-card
        :image-url="`/_nuxt/assets/images/cards/${
          cardsOnDeck[0]?.img || 'card-face-down'
        }.svg`"
      ></game-open-card>
      <game-open-card
        :image-url="`/_nuxt/assets/images/cards/${
          cardsOnDeck[1]?.img || 'card-face-down'
        }.svg`"
      ></game-open-card>
      <game-open-card
        :image-url="`/_nuxt/assets/images/cards/${
          cardsOnDeck[2]?.img || 'card-face-down'
        }.svg`"
      ></game-open-card>
    </div>
  </div>
</template>
