<template>
  <div
    v-show="show"
    @click="close"
    class="fixed w-[100vw] h-[100vh] bg-black/50 top-0 left-0 backdrop-blur-sm"
  ></div>
</template>

<script setup lang="ts">
import { EventManager } from "@/main";
import { ref } from "vue";

const show = ref(false);

const close = () => {
  EventManager.emit("closeModal");
};

EventManager.on("closeModal", () => {
  show.value = false;
});

EventManager.on("openModal", (e) => {
  console.log("Recieved Funding");
  show.value = true;
});
</script>

<style scoped></style>
