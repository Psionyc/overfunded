<template>
  <div class="faucet_view w-full h-full bg-[#181818] lg:px-12">
    <Navbar />

    <div class="faucet_container w-full grid place-items-center">
      <div
        class="faucet flex flex-col items-center gap-4 bg-dark-bluish w-[90%] max-w-[500px] h-[300px] rounded-[24px] pt-5"
      >
        <h1 class="font-semibold text-[32px] mb-4">OUSD Faucet</h1>
        <p v-show="walletStore.isConnected" class="font-semibold text-[20px]">
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
          class="bg-greenish font-semibold outline-none border-none rounded-[12px] py-2 px-4 text-[18px] flex items-center justify-center"
        >
          Get OUSD
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
  await propertyStore.getOUSD()
  const userBalance = await propertyStore.getOUSDBalance(walletStore.wallet!);
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
