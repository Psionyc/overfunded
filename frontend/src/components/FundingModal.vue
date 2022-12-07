<template>
  <div
    v-if="show"
    class="w-[90%] fund-modal max-w-[500px] rounded-[32px] bg-dark-bluish fixed top-[50%] left-[50%] translate-x-[-50%] translate-y-[-50%] flex flex-col items-center"
  >
    <div class="py-6 w-full items-center gap-4 flex flex-col px-4">
      <p class="font-semibold text-[24px] mb-4">Fund Property</p>
      <label for="amount" class="self-start font-semibold text-[18px] ml-2"
        >Amount- (${{formatter.format(Math.round(inputValues.amount))}})</label
      >
      <div class="w-full">
        <div
          class="bg-black/20 rounded-tr-[16px] rounded-tl-[16px] py-2 px-4 w-full flex gap-2"
        >
          <input
            v-model="inputValues.amount"
            name="amount"
            type="number"
            class="w-full text-center h-full bg-transparent border-none outline-none text-[20px]"
          />
        </div>
        <div
          class="flex items-center bg-black/20 gap-1 rounded-br-[24px] rounded-bl-[24px] justify-between"
        >
          <button
            @click="setAmount(property.price - property.funds)"
            class="bg-greenish font-semibold w-full text-[18px] px-4 py-2 rounded-bl-[24px] text-center"
          >
            MAX
          </button>
          <button
            @click="setAmount(10_000)"
            class="bg-greenish font-semibold w-full text-[18px] px-4 py-2 text-center"
          >
            10K
          </button>
          <button
            @click="setAmount(50_000)"
            class="bg-greenish font-semibold w-full text-[18px] px-4 py-2"
          >
            50K
          </button>
          <button
            @click="setAmount(100_000)"
            class="bg-greenish font-semibold w-full text-[18px] px-4 py-2 rounded-br-[24px]"
          >
            100K
          </button>
        </div>
      </div>
      <label class="self-start font-semibold text-[18px] mt-4 ml-2" for="note"
        >Note(Optional)</label
      >
      <div class="bg-black/20 rounded-[16px] py-4 px-4 w-full text-[20px]">
        <input
          v-model="inputValues.note"
          :disabled="loading"
          name="note"
          type="text"
          class="w-full h-full bg-transparent border-none outline-none"
        />
      </div>
    </div>
    <button
      @click="fund"
      class="bg-greenish h-[72px] disabled:bg-greenish/50 mt-auto w-full text-[24px] font-semibold px-4 py-2 rounded-full flex gap-4 items-center justify-center"
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
      <p>Fund<span v-if="loading">ing</span></p>
    </button>
  </div>
</template>

<script setup lang="ts">
import { ToastType } from "@/events";
import { EventManager } from "@/main";
import { usePropertyStore } from "@/stores/property_store";
import { onMounted, reactive, ref } from "vue";
const property = reactive({
  funds: 0,
  id: 0,
  price: 0,
});

const show = ref(false);
const loading = ref(false);
const formatter = Intl.NumberFormat("en", {
  notation: "compact",
  maximumFractionDigits: 2,
});

const propertyStore = usePropertyStore();

interface InputValues {
  amount: number;
  note: string;
}

const inputValues = reactive<InputValues>({
  amount: 0,
  note: "",
});

const setAmount = (value: number) => {
  const rem = property.price - property.funds;
  if (value > rem) {
    return (inputValues.amount = rem);
  } else {
    inputValues.amount = value;
  }
};

EventManager.on("openFundModal", (e) => {
  console.log("Recieved Funding");
  property.id = e.id;
  property.funds = e.funds;
  property.price = e.price;
  show.value = true;
});

EventManager.on("closeModal", () => {
  show.value = false;
});

const fund = async () => {
  const rem = property.price - property.funds;
  if (rem <= 0) {
    EventManager.emit("closeModal");
    return EventManager.emit("toast", {
      message: "This property is fully funded",
      type: ToastType.WARNING,
    });
  }
  if (inputValues.amount <= 0) {
    return EventManager.emit("toast", {
      message: "Your fund has to be greater than 0",
      type: ToastType.WARNING,
    });
  }
  loading.value = true;
  console.log(inputValues.amount, inputValues.note);
  const data = await propertyStore
    .fundProperty(property.id, inputValues.amount)
    .finally(() => {
      loading.value = false;
    });

  EventManager.emit("closeModal");
};
</script>

<style scoped>
input::-webkit-outer-spin-button,
input::-webkit-inner-spin-button {
  -webkit-appearance: none;
  margin: 0;
}

input[type="number"] {
  -moz-appearance: textfield;
}

.fund-modal {
}
</style>
