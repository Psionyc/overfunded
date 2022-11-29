<template>
  <div
    v-if="show"
    class="w-[90%] fund-modal max-w-[500px] rounded-[32px] bg-dark-bluish fixed top-[50%] left-[50%] translate-x-[-50%] translate-y-[-50%] flex flex-col items-center"
  >
    <div class="py-6 w-full items-center gap-4 flex flex-col px-4">
      <p class="font-semibold text-[24px] mb-4">Fund Property</p>
      <label for="amount" class="self-start font-semibold text-[18px] ml-2"
        >Amount (OUSD)</label
      >
      <div class="h-14 bg-black/20 rounded-[16px] py-2 px-4 w-full flex gap-2">
        <input
          name="amount"
          type="number"
          class="w-full h-full bg-transparent border-none outline-none text-[20px]"
        />
        <div class="hidden md:flex gap-2 items-center">
          <button
            class="bg-dark-greenish font-semibold text-[14px] px-4 py-2 rounded-xl text-center"
          >
            500k
          </button>
          <button
            class="bg-dark-greenish font-semibold text-[14px] px-4 py-2 rounded-xl"
          >
            1M
          </button>
          <button
            class="bg-dark-greenish font-semibold text-[14px] px-4 py-2 rounded-xl"
          >
            10M
          </button>
        </div>
      </div>

      <div class="flex items-center px-4 gap-4 justify-between md:hidden">
        <button
          class="bg-dark-greenish font-semibold text-[14px] px-4 py-2 rounded-xl text-center"
        >
          500k
        </button>
        <button
          class="bg-dark-greenish font-semibold text-[14px] px-4 py-2 rounded-xl"
        >
          1M
        </button>
        <button
          class="bg-dark-greenish font-semibold text-[14px] px-4 py-2 rounded-xl"
        >
          10M
        </button>
      </div>
      <label class="self-start font-semibold text-[18px] ml-2" for="note"
        >Note</label
      >
      <div class="h-12 bg-black/20 rounded-[16px] py-2 px-4 w-full text-[20px]">
        <input
          name="note"
          type="text"
          class="w-full h-full bg-transparent border-none outline-none"
        />
      </div>
    </div>
    <button
      class="bg-greenish h-[72px] w-full mt-4 text-[24px] font-semibold px-4 py-2 rounded-full"
    >
      Fund
    </button>
  </div>
</template>

<script setup lang="ts">
import { EventManager } from "@/main";
import { onMounted, ref } from "vue";
const property = ref(0);
const show = ref(false);

EventManager.on("openFundModal", (e) => {
  console.log("Recieved Funding");
  property.value = e.property;
  show.value = true;
});

EventManager.on("closeFundModal", () => {
  show.value = false;
});
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
