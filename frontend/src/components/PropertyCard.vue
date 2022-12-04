<template>
  <div class="bg-dark-bluish w-full rounded-[32px] relative overflow-hidden">
    <p class="price absolute right-8 top-2 text-white font-bold text-[32px]">
      ${{ formatter.format(props.price) ?? "2.1M" }}
    </p>
    <img
      :src="props.images![0] ??`https://unsplash.com/photos/2keCPb73aQY/download?ixid=MnwxMjA3fDB8MXxzZWFyY2h8OHx8aG91c2VzfGVufDB8fHx8MTY2OTU0Mzg1Mw&force=true`"
      class="h-[200px] w-full rounded-tr-[32px] rounded-tl-[32px] object-cover"
      alt=""
      srcset=""
    />

    <div class="flex flex-col gap-4 w-full px-2 md:px-4">
      <div class="flex gap-2 items-center mt-4 justify-between">
        <div class="flex gap-4 items-center">
          <p class="font-semibold text-[28px]">
            {{ props.name ?? "La Catalei House" }}
          </p>

          <img
            v-show="props.verified"
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
          :style="{
  width: `${props.funds! / props.price! * 200}px`
}
        "
          
          class="absolute h-2 rounded-full bg-gradient-to-r from-gradient-start to-gradient-stop"
        ></div>
      </div>

      <div class="flex gap-2 items-center">
        <img src="@/assets/images/coin-white.svg" alt="" srcset="" />
        <p class="font-semibold text-[24px]">
          {{ formatCommas.format(props.funds) ?? 0 }}/{{ formatCommas.format(props.price) }}
          <span class="text-[20px]"
            >({{ ((props.funds! / props.price!) * 100).toFixed(1) }}% Funded)</span
          >
        </p>
      </div>
      <div class="flex gap-2 items-start">
        <img src="@/assets/images/location.svg" alt="" srcset="" class="mt-2" />
        <p class="font-semibold text-[24px]">
          {{
            props.location ??
            `23475 Glacier View Dr, Eagle River, Alaska 99577, USA`
          }}
        </p>
      </div>
    </div>
    <button
      @click="fund()"
      class="bg-greenish h-[72px] w-full mt-6 text-[24px] font-semibold px-4 py-2 "
    >
      Fund
    </button>
  </div>
</template>

<script setup lang="ts">
import { EventManager } from "@/main";

export interface PropertyInterface {
  id: number;
  name?: string;
  images?: string[];
  price: number;
  funds: number;
  verified?: boolean;
  location?: string;
}


const formatter = Intl.NumberFormat("en-US", {
  compactDisplay: "short",
  notation: 'compact',
  maximumFractionDigits: 1, 
  
  
  
})


const formatCommas = Intl.NumberFormat("en-Us", {
  currency: "USD",
  notation: 'standard'
})

const props = defineProps<PropertyInterface>();

const fund = () => {
  console.log("Funding");
  EventManager.emit('closeModal')
  EventManager.emit("openFundModal", { id: props.id, price: props.price, funds: props.funds });
  EventManager.emit("openModal");
};
</script>

<style lang="scss" scoped>
.price {
  text-shadow: 4px 4px 4px #000000;
}
</style>
