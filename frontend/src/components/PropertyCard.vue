<template>
  <div class="bg-dark-bluish w-full rounded-[32px] relative overflow-hidden">
    <p class="price absolute right-8 top-2 text-white font-bold text-[28px]">
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
          <p class="font-semibold text-[20px]">
            {{ props.name ?? "La Catalei House" }}
          </p>

          <img
            v-show="props.verified"
            src="@/assets/images/verified.svg"
            alt="verified"
            srcset=""
            class="h-[20px]"
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
        <p class="font-semibold text-[18px]">
          {{ formatCommas.format(props.funds) ?? 0 }}/{{
            formatCommas.format(props.price)
          }}
          <span class="text-[16px]"
            >({{ ((props.funds! / props.price!) * 100).toFixed(1) }}%
            Funded)</span
          >
        </p>
      </div>
      <div class="flex gap-2 items-center">
        <img src="@/assets/images/location.svg" alt="" srcset="" class="mt-2" />
        <p class="font-semibold text-[16px]">
          {{
            props.location ??
            `23475 Glacier View Dr, Eagle River, Alaska 99577, USA`
          }}
        </p>
      </div>
    </div>
    <div class="flex gap-1">
      <button
        @click="fund()"
        class="bg-greenish h-[50px] w-full mt-6 text-[18px] font-semibold px-4 py-2"
      >
        Fund
      </button>
      <button
      :disabled="(!isOwner || notFullyFunded || withdrawLoading)"
        @click="withdraw"
        class="bg-greenish h-[50px] w-full mt-6 text-[18px] font-semibold px-4 py-2 disabled:bg-greenish/60 flex justify-center items-center gap-2"
      >
      <svg
          v-show="withdrawLoading"
          class="animate-spin max-w-[24px] max-h-[24px] text-white"
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
        >
          <circle
            class="opacity-25"
            cx="12"
            cy="12"
            r="10"
            stroke="currentColor"
            stroke-width="4"
          ></circle>
          <path
            class="opacity-75"
            fill="currentColor"
            d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
          ></path>
        </svg>
        <p v-if="withdrawLoading">Withdrawing</p>
        <p v-else>Withdraw</p>
      </button>
    </div>
  </div>
</template>

<script setup lang="ts">
import { EventManager } from "@/main";
import { usePropertyStore } from "@/stores/property_store";
import { usewalletStore } from "@/stores/wallet_store";
import { ref } from "vue";

export interface PropertyInterface {
  id: number;
  name?: string;
  images?: string[];
  price: number;
  funds: number;
  verified?: boolean;
  location?: string;
  owner: string;
}

const propertyStore = usePropertyStore();
const walletStore = usewalletStore();

const formatter = Intl.NumberFormat("en-US", {
  compactDisplay: "short",
  notation: "compact",
  maximumFractionDigits: 1,
});

const formatCommas = Intl.NumberFormat("en-Us", {
  currency: "USD",
  notation: "standard",
});

const props = defineProps<PropertyInterface>();


const withdrawLoading = ref<boolean>(false)
const isOwner = ref<boolean>((props.owner.toLowerCase() == walletStore.wallet.toLowerCase()))
const notFullyFunded = props.funds < props.price

const fund = () => {
  EventManager.emit("closeModal");
  EventManager.emit("openFundModal", {
    id: props.id,
    price: props.price,
    funds: props.funds,
  });
  EventManager.emit("openModal");
};

const withdraw = async () => {
  
  withdrawLoading.value = true
  await propertyStore.withdrawFunds(props.id).finally(()=>{
    withdrawLoading.value = false
  })
};
</script>

<style lang="scss" scoped>
.price {
  text-shadow: 4px 4px 4px #000000;
}
</style>
