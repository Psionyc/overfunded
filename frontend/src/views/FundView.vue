<template>
  <div class="fund_view w-full h-full bg-[#181818] lg:px-12">
    <Navbar />

    <div
      class="flex flex-col w-full md:flex-row px-4 gap-4 md:justify-between items-center justify-center my-8"
    >
      <h2 v-if="!walletStore.isConnected" class="font-bold text-[28px]">
        Connect a wallet...
      </h2>
      <h2 v-else class="font-bold text-[28px] text-ellipsis whitespace-nowrap">
        Hello {{ walletStore.user }}...
      </h2>
      <button
        v-if="!walletStore.isConnected"
        @click="walletStore.connect"
        class="font-medium text-[20px] bg-main/60 px-4 py-2 rounded-[12px] w-full md:w-[242px]"
      >
        Connect
      </button>
      <button
        v-else
        @click="walletStore.disconnect"
        class="font-medium text-[20px] bg-main/60 px-4 py-2 rounded-[12px] w-full md:w-[242px]"
      >
        Disconnect
      </button>
    </div>

    <div
      class="flex flex-col gap-4 justify-center md:flex-row md:justify-between items-center px-4"
    >
      <div
        class="bg-black/50 rounded-[16px] h-[60px] md:w-[446px] pl-8 flex items-center"
      >
        <input
          type="text"
          class="font-semibold text-[24px] bg-transparent w-full outline-none"
          placeholder="Search..."
        />
      </div>

      <div class="flex gap-20 items-center font-medium text-[20px]">
        <select
          name=""
          id="type"
          class="bg-transparent gap-2 outline-none border-none"
        >
          <option class="bg-transparent text-black text-[20px] font-medium">
            Properties
          </option>
          <option class="bg-transparent text-black text-[20px] font-medium">
            Projects
          </option>
        </select>
        <select
          name=""
          id="sort"
          class="bg-transparent outline-none border-none"
        >
          <option class="bg-transparent text-black text-[20px] font-medium">
            Sort By
          </option>
          <option class="bg-transparent text-black text-[20px] font-medium">
            Price
          </option>
          <option class="bg-transparent text-black text-[20px] font-medium">
            Funds
          </option>
        </select>
      </div>
    </div>

    <div
      class="grid grid-cols-1 lg:grid-cols-2 gap-x-16 gap-y-6 py-6 px-4 md:px-8"
    >
      <PropertyCard />
      <PropertyCard />
      <PropertyCard />
      <PropertyCard />
      <PropertyCard />
    </div>
    <OVFooter />
  </div>
  <Cover />
  <FundingModal />
</template>

<script setup lang="ts">
import { Navbar, OVFooter, PropertyCard } from "@/components";

import FundingModal from "@/components/FundingModal.vue";
import Cover from "@/components/Cover.vue";
import { usewalletStore } from "@/stores/wallet_store";
import { onMounted } from "vue";

const walletStore = usewalletStore();

// onMounted(async () => {
//   await walletStore.connect();
// });
</script>

<style scoped></style>
