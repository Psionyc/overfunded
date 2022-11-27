<template>
  <div class="bg-dark-bluish w-full rounded-[32px] relative overflow-hidden">
    <p class="absolute right-8 top-2 text-white font-bold text-[32px]">$2.1M</p>
    <img
      src="https://unsplash.com/photos/2keCPb73aQY/download?ixid=MnwxMjA3fDB8MXxzZWFyY2h8OHx8aG91c2VzfGVufDB8fHx8MTY2OTU0Mzg1Mw&force=true"
      class="h-[200px] w-full rounded-[32px] object-cover"
      alt=""
      srcset=""
    />

    <div class="flex flex-col gap-4 w-full px-2 md:px-4">
      <div class="flex gap-2 items-center mt-4 justify-between">
        <div class="flex gap-4 items-center">
          <p class="font-semibold text-[28px]">La Catalei House</p>

          <img
            src="@/assets/images/verified.svg"
            alt="verified"
            srcset=""
            class="h-[30px]"
          />
        </div>
      </div>

      <div class="percentage-container flex relative">
        <div class="w-[200px] h-2 rounded-full bg-[#1F1C21]"></div>
        <div
          class="w-[150px] absolute h-2 rounded-full bg-gradient-to-r from-gradient-start to-gradient-stop"
        ></div>
      </div>

      <div class="flex gap-2 items-center">
        <img src="@/assets/images/coin-white.svg" alt="" srcset="" />
        <p class="font-semibold text-[24px]">
          1.2m/1.8m <span class="text-[20px]">(67% Funded)</span>
        </p>
      </div>
      <div class="flex gap-2 items-start">
        <img src="@/assets/images/location.svg" alt="" srcset="" class="mt-2" />
        <p class="font-semibold text-[24px]">
          23475 Glacier View Dr, Eagle River, Alaska 99577, USA
        </p>
      </div>
    </div>
    <button
      class="bg-greenish h-[72px] w-full mt-4 text-[24px] font-semibold px-4 py-2 rounded-tr-[32px] rounded-tl-[32px]"
    >
      Fund
    </button>
  </div>
</template>

<script setup lang="ts">
import { Property } from "@/models/Property";

export interface PropertyInterface {
  name?: string;
  images?: string[];
  price?: number;
  funded?: number;
  verified?: boolean;
  location?: string;
}

const props = defineProps<PropertyInterface>();
</script>

<style lang="sass" scoped></style>
