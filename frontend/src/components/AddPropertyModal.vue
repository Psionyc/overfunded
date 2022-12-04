<template>
  <div
    v-if="show"
    class="w-[90%] fund-modal max-w-[500px] rounded-[32px] bg-dark-bluish fixed top-[50%] left-[50%] translate-x-[-50%] translate-y-[-50%] flex flex-col items-center"
  >
    <div class="py-6 w-full items-center gap-4 flex flex-col px-4">
      <p class="font-semibold text-[24px] mb-4">Add Property</p>

      <label class="self-start font-semibold text-[18px] ml-2" for="note"
        >Name</label
      >
      <div class="h-12 bg-black/20 rounded-[16px] py-2 px-4 w-full text-[20px]">
        <input
          v-model="inputValues.name"
          name="note"
          type="text"
          class="w-full h-full bg-transparent border-none outline-none"
        />
      </div>
      <label for="amount" class="self-start font-semibold text-[18px] ml-2"
        >Price (OUSD)</label
      >
      <div class="h-14 bg-black/20 rounded-[16px] py-2 px-4 w-full flex gap-2">
        <input
          v-model="inputValues.price"
          name="amount"
          type="number"
          class="w-full text-center h-full bg-transparent border-none outline-none text-[20px]"
        />
      </div>

      <div class="flex items-center px-4 gap-4 justify-between">
        <button
          @click="setPrice(10_000)"
          class="bg-greenish font-semibold text-[20px] px-4 py-2 rounded-xl text-center"
        >
          10K
        </button>
        <button
          @click="setPrice(50_000)"
          class="bg-greenish font-semibold text-[20px] px-4 py-2 rounded-xl"
        >
          50K
        </button>
        <button
          @click="setPrice(100_000)"
          class="bg-greenish font-semibold text-[20px] px-4 py-2 rounded-xl"
        >
          100K
        </button>
      </div>
      <label class="self-start font-semibold text-[18px] ml-2" for="note"
        >Location</label
      >
      <div class="h-12 bg-black/20 rounded-[16px] py-2 px-4 w-full text-[20px]">
        <input
          v-model="inputValues.location"
          name="note"
          type="text"
          class="w-full h-full bg-transparent border-none outline-none"
        />
      </div>
      <label class="self-start font-semibold text-[18px] ml-2" for="note"
        >Image (url)</label
      >
      <div class="h-12 bg-black/20 rounded-[16px] py-2 px-4 w-full text-[20px]">
        <input
          v-model="inputValues.image"
          name="note"
          type="text"
          class="w-full h-full bg-transparent border-none outline-none"
        />
      </div>
    </div>
    <button
      @click="addProperty"
      class="bg-greenish h-[72px] mt-auto w-full text-[24px] font-semibold px-4 py-2 rounded-full flex gap-4 items-center justify-center"
    >
      <svg
        v-if="loading"
        class="animate-spin h-8 w-8 text-white"
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
      <p>Add<span v-if="loading">ing</span></p>
    </button>
  </div>
</template>

<script setup lang="ts">
import { ToastType } from "@/events";
import { EventManager } from "@/main";
import { usePropertyStore } from "@/stores/property_store";
import { reactive, ref } from "vue";
const property = ref(0);
const show = ref(false);
const loading = ref(false);

const propertyStore = usePropertyStore();

const inputValues = reactive({
  name: "",
  price: 0,
  image: "",
  location: "",
});

const setPrice = (value: number) => {
  inputValues.price = value;
};

EventManager.on("openAddPropertyModal", () => {
  show.value = true;
});

EventManager.on("closeModal", () => {
  show.value = false;
});

const addProperty = async () => {
  console.log(inputValues.price, inputValues.name);
  const { name, price, image, location } = inputValues;
  loading.value = true;
  await propertyStore.addProperty(name, price, image, location);
  EventManager.emit("closeModal");
  EventManager.emit("toast", {
    message: "Transaction successful",
    type: ToastType.SUCCESS,
  });
  await propertyStore.refreshProperties();
  loading.value = false;
};
</script>

<style scoped>
/* Chrome, Safari, Edge, Opera */
input::-webkit-outer-spin-button,
input::-webkit-inner-spin-button {
  -webkit-appearance: none;
  margin: 0;
}

/* Firefox */
input[type="number"] {
  -moz-appearance: textfield;
}

.fund-modal {
}
</style>
