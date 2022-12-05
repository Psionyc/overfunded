<template>
  <div
    class="w-full h-[92px] mt-6 bg-main/20 px-12 flex items-center justify-between rounded-[24px]"
  >
    <router-link to="/"
      ><h2 class="font-bold text-[24px]">
        Over<span class="text-bluish">funded</span>
      </h2>
    </router-link>
    <div class="md:flex gap-6 hidden  items-center text-[18px] font-medium">
      <RouterLink to="/fund"><h4>Properties</h4></RouterLink>
      <RouterLink to="/faucet"><h4>Faucet</h4></RouterLink>
    </div>
    <img @click="EventManager.emit('openMobileMenu')" class="h-[24px] md:hidden block" src="@/assets/images/menu.svg" alt="" srcset="">
  </div>
  <MobileMenu/>
  
</template>

<script setup lang="ts">
import type { RouterLink } from "vue-router";
import MobileMenu from "./MobileMenu.vue";
import { EventManager } from "@/main";
</script>

<style scoped></style>
