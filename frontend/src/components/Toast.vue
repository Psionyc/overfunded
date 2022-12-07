<template>
  <div
    v-show="show"
    class="toast w-[0%] max-w-[700px] rounded-r-full mx-auto fixed justify-center items-center left-0 bottom-[10px] min-h-[60px] max-h-[120px] flex gap-2 px-6"
    :style="{
      'background-color': `${background}`,
    }"
  >
    <p v-show="showText" class="text-[16px] font-semibold text-center">
      {{ message }}
    </p>
  </div>
</template>

<script setup lang="ts">
import { ToastType } from "@/events";
import { EventManager } from "@/main";
import { computed, ref } from "vue";
import { animate } from "motion";

const message = ref<string>("No messages yet");
const toastType = ref<ToastType>(ToastType.SUCCESS);
const show = ref<boolean>(false);
const showText = ref<boolean>(false);

const background = computed(() => {
  let bg = "";
  switch (toastType.value) {
    case ToastType.ERROR:
      bg = "#b20505";
      break;
    case ToastType.SUCCESS:
      bg = "green";
      break;
    case ToastType.WARNING:
      bg = "#e29300";
      break;

    default:
      bg = "#0F3B7E";
      break;
  }
  return bg;
});

const animateIn = async () => {
  show.value = true;
  await animate(
    ".toast",
    {
      width: "100%",
    },
    {
      duration: 0.3,
      easing: 'ease-in-out'
    }
  ).finished;
  showText.value = true;
};
const animateOut = async () => {
  showText.value = false;
  await animate(
    ".toast",
    {
      width: "0%",
    },
    {
      duration: 0.3,
    }
  ).finished;

  show.value = false;
};

const timer = ref<any>(null);
const start = async () => {
  animateIn();
  console.log(timer.value);
  clearTimeout(timer.value);
  const tm = setTimeout(() => {
    animateOut();
  }, 4000);

  timer.value = tm;
};

EventManager.on("toast", (e) => {
  message.value = e.message;
  toastType.value = e.type;
  start();
});
</script>

<style lang="scss" scoped>
.toast {
  transition: all 2s;
}
</style>
