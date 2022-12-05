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
        Hello
        <span @click="openUserDataModal" class="underline open-userdata-button"
          >{{ walletStore.walletAddressOrUsername }}...</span
        >
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
          v-model="searchInput"
          @keyup="search"
          type="text"
          class="font-semibold text-[24px] bg-transparent w-full outline-none"
          placeholder="Search..."
        />
      </div>

      <div class="flex gap-20 items-center font-medium text-[20px]">
        <button
          class="flex gap-4 text-white"
          @click="openAddPropertyModal"
          :disabled="!walletStore.isConnected"
        >
          + Add Property
        </button>
        <select
          name=""
          id="sort"
          class="bg-transparent outline-none border-none"
          v-model="sortByValue"
        >
          <option class="bg-transparent text-black text-[20px] font-medium">
            {{ SortBy.NONE }}
          </option>
          <option class="bg-transparent text-black text-[20px] font-medium">
            {{ SortBy.PRICE_ASC }}
          </option>
          <option class="bg-transparent text-black text-[20px] font-medium">
            {{ SortBy.PRICE_DESC }}
          </option>
          <option class="bg-transparent text-black text-[20px] font-medium">
            {{ SortBy.EROI }}
          </option>
        </select>
      </div>
    </div>

    <div
      v-if="!walletStore.isConnected"
      class="grid grid-cols-1 gap-x-16 gap-y-6 py-6 px-4 md:px-8 h-[400px] place-items-center"
    >
      <p class="font-semibold text-[18px]">
        Connect a wallet to view properties...
      </p>
    </div>
    <div
      v-else-if="walletStore!.isLoading"
      class="grid grid-cols-1 gap-x-16 gap-y-6 py-6 px-4 md:px-8 h-[400px] place-items-center"
    >
      <svg
        class="animate-spin h-16 w-16 text-white"
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
    </div>

    <div
      v-else
      class="grid grid-cols-1 min-h-[400px] lg:grid-cols-2 gap-x-16 gap-y-6 py-6 px-4 md:px-8"
    >
      <PropertyCard
        v-for="property in propertyStore.sortedProperties"
        :id="property.id.toNumber()"
        :owner="property.owner"
        :name="property.name"
        :price="property.price.toNumber()"
        :verified="property.verified"
        :location="property.location"
        :funds="property.funds.toNumber()"
        :images="property.images"
      />
    </div>
    <div v-if="walletStore.isConnected" class="grid place-items-center">
      <svg
        v-if="loadingMore"
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
      <p v-else @click="fetchMoreProperties" class="text-[18px] font-bold">
        + See More
      </p>
    </div>
    <OVFooter />
  </div>
  <Cover />
  <FundingModal />
  <AddPropertyModal />
  <UserDataModal />
</template>

<script setup lang="ts">
import { Navbar, OVFooter, PropertyCard } from "@/components";
import FundingModal from "@/components/FundingModal.vue";
import Cover from "@/components/Cover.vue";
import { usewalletStore } from "@/stores/wallet_store";
import { onMounted, ref, watch } from "vue";
import { usePropertyStore, SortBy } from "@/stores/property_store";
import { EventManager } from "@/main";
import AddPropertyModal from "@/components/AddPropertyModal.vue";
import UserDataModal from "@/components/UserDataModal.vue";
import debounce from "debounce";
const walletStore = usewalletStore();
const propertyStore = usePropertyStore();
const sortByValue = ref<SortBy>(SortBy.NONE);
const searchInput = ref<string>("");
const loadingMore = ref(false);

onMounted(() => {
  walletStore.connect();
});
const openAddPropertyModal = () => {
  EventManager.emit("closeModal");
  EventManager.emit("openModal");
  EventManager.emit("openAddPropertyModal");
};

async function fetchMoreProperties() {
  loadingMore.value = true;
  await propertyStore.getNextPaginatedProperties().finally(() => {
    loadingMore.value = false;
  });
}

const search = () => {
  debounce(() => {
    propertyStore.search(searchInput.value);
  }, 700).call(propertyStore);
};

const openUserDataModal = () => {
  EventManager.emit("closeModal");
  EventManager.emit("openUserDataModal");
};

watch(sortByValue, () => {
  propertyStore.changeSortBy(sortByValue.value);
});
</script>

<style scoped>
.open-userdata-button {
  -webkit-user-select: none;
  -khtml-user-select: none;
  -moz-user-select: none;
  -ms-user-select: none;
  -o-user-select: none;
  user-select: none;
}
</style>
