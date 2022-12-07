<template>
  <div
    class="w-full h-[72px]  bg-main/20 px-6 md:px-12 flex items-center justify-between mb-4 md:rounded-[24px] md:mt-4"
  >
    <router-link to="/"
      ><h2 class="font-bold text-[20px] md-text-[24px]">
        Over<span class="text-bluish">funded</span>
      </h2>
    </router-link>
    <div class="md:flex gap-6 hidden  items-center text-[18px] font-medium">
      <RouterLink to="/fund"><h4>Properties</h4></RouterLink>
      <RouterLink to="/faucet"><h4>Faucet</h4></RouterLink>
    </div>
    <img @click="EventManager.emit('openMobileMenu')" class="h-[20px] w-[40px] object-scale-down md:hidden block" src="@/assets/images/menu.svg" alt="" srcset="">
  </div>
  <MobileMenu/>
  
</template>

<script setup lang="ts">
import type { RouterLink } from "vue-router";
import MobileMenu from "./MobileMenu.vue";
import { EventManager } from "@/main";
</script>

<style scoped></style>
