<template>
  <div
  v-show="show"
    class="mobileMenu w-full max-w-[500px] h-[100vh] grid place-items-center fixed top-0 right-0 bg-dark-bluish z-20 rounded-tl-[24px] rounded-bl-[24px]"
  >
    <div
      @click="EventManager.emit(`closeMobileMenu`)"
      class="fixed bg-greenish w-[40px] h-[40px] right-[10px] top-[20px] p-2 grid place-items-center rounded-full"
    >
      <img src="@/assets/images/close.svg" class="w-[80%]" alt="" srcset="" />
    </div>
    <div
      class="innards w-full h-full flex flex-col justify-center items-center gap-4"
    >
      <RouterLink to="/fund" class="text-[18px] font-semibold"
        >Properties</RouterLink
      >
      <RouterLink to="/faucet" class="text-[18px] font-semibold"
        >Faucet</RouterLink
      >
      <RouterLink to="#" class="text-[18px] font-semibold text-gray-400"
        >Auction</RouterLink
      >
      <RouterLink to="#" class="text-[18px] font-semibold text-gray-400"
        >My NFTS</RouterLink
      >
    </div>
  </div>
</template>

<script setup lang="ts">
import { animate } from "motion";
import { EventManager } from "@/main";
import { ref } from "vue";
const show = ref(false);

function open() {
    show.value = true
}
function close() {
    show.value = false
}

defineExpose({open})

EventManager.on("openMobileMenu", () => {
    open()
});

EventManager.on("closeMobileMenu", () => {
    close()
});
</script>

<style scoped></style>
