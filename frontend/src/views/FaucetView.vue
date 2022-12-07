<template>
  <div class="faucet_view w-full h-full bg-[#181818] lg:px-12">
    <Navbar />

    <div class="faucet_container w-full grid place-items-center">
      <div
        class="faucet flex flex-col items-center gap-4 bg-dark-bluish w-[90%] max-w-[500px] h-[300px] rounded-[24px] pt-5"
      >
        <h1 class="font-semibold text-[28px] mb-4">OUSD Faucet</h1>
        <p v-show="walletStore.isConnected" class="font-semibold text-[18px]">
          <span class="text-[16px] text-greenish">Balance >></span> {{ formatter.format(balance) }} OUSD
        </p>
        <button
          v-if="!walletStore.isConnected"
          @click="walletStore.connect"
          class="bg-greenish font-semibold outline-none border-none rounded-[12px] py-2 px-4 text-[18px]"
        >
          Connect Wallet
        </button>
        <button
          v-else
          @click="walletStore.disconnect"
          class="bg-greenish font-semibold outline-none border-none rounded-[12px] py-2 px-4 text-[18px]"
        >
          Disconnect Wallet
        </button>
        <button
          :disabled="!walletStore.isConnected"
          @click="getOUSD"
          class="bg-greenish font-semibold outline-none border-none rounded-[12px] py-2 px-4 text-[18px] flex items-center justify-center gap-2"
        >
        <svg
          v-if="loading"
          class="animate-spin max-h-[18px] min-w-[18px] text-white"
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
          <p v-if="loading">Getting OUSD</p>
          <p v-else >Get OUSD</p>
        </button>
      </div>
    </div>
    <OVFooter />
  </div>
</template>

<script setup lang="ts">
import { Navbar, OVFooter } from "@/components";
import { EventManager } from "@/main";
import { usewalletStore } from "@/stores/wallet_store";
import { usePropertyStore } from "@/stores/property_store";
import { onMounted, ref } from "vue";

const walletStore = usewalletStore();
const propertyStore = usePropertyStore();
const balance = ref<number>(0);
const formatter = Intl.NumberFormat("en-US", {
  notation: "standard",
});

const loading = ref<boolean>(false)




//Life Cycle & Events
onMounted(async () => {
  await walletStore.connect();
  if (!walletStore.isConnected) return;
  const userBalance = await propertyStore.getOUSDBalance(walletStore.wallet);
  balance.value = userBalance!.toNumber();
});

EventManager.on("connectOrUpdatedUser", async () => {
  const userBalance = await propertyStore.getOUSDBalance(walletStore.wallet!);
  balance.value = userBalance!.toNumber();
});

//Functions 
const getOUSD = async  ()=>{
  loading.value = true
  await propertyStore.getOUSD()
  const userBalance = await propertyStore.getOUSDBalance(walletStore.wallet!).finally(()=>{
    loading.value = false
  });
  balance.value = userBalance!.toNumber();
}

</script>

<style lang="scss" scoped>
.faucet_container {
  height: calc(100vh - 234px);
}

.button {
}
</style>
