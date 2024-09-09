<template>
   <div class="-mt-2 p-2 lg:mt-0 lg:w-full lg:max-w-[16rem] lg:flex-shrink-0">
      <div class="rounded-2xl bg-teal-600/20 shadow-lg py-5 text-center ring-1 ring-inset ring-gray-900/5 lg:flex lg:flex-col lg:justify-center lg:py-5">
        <div class="mx-auto max-w-xs px-8">
          <p class="flex items-baseline justify-center">
            <span class="text-2xl font-bold tracking-tight text-gray-900">{{ emdData.name }}</span>
          </p>
          <p class="flex flex-col items-center">
            <span class="block text-base mt-2 font-semibold text-gray-600">Single-particle</span>
            <span class="block text-base mt-2 font-semibold text-gray-600">{{ emdData.resolutionRatio }}</span>
          </p>
          <img src="/emd_0001.gif" class="mt-4">
          <p class="text-sm mt-6 font-semibold text-gray-600">Deposition: {{ emdData.deposition }} </p>
          <p class="text-sm font-semibold text-gray-600">Map released: {{ emdData.mapReleased }}</p>
          <p class="text-sm font-semibold text-gray-600">Last Modified: {{ emdData.lastModified }}</p>
        </div>
      </div>
    </div>
</template>

<script setup>
import { defineProps, ref } from "vue";

import { watch } from "vue";

// const props = defineProps({
//   name: String,
//   resolutionRatio: Number,
//   deposition: String,
//   mapReleased: String,
//   lastModified: String,
// });
const props = defineProps({
  emdData: Object
})
</script>

<style scoped>
/* ./src/index.css */
@tailwind base;
@tailwind components;
@tailwind utilities;
</style>