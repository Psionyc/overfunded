<template>
  <div class="flex w-full flex-col my-8 gap-6 py-4">
    <div
      class="flex q self-start w-full max-w-[500px]  min-h-[72px]  bg-[#0F3B7E] rounded-tr-[32px] rounded-bl-[32px] rounded-br-[32px] px-8 py-6"
    >
      <p class="font-medium  text-[16px] md:text-[20px] max-w-[420px]">
        {{question?? 'What happens when an asset is rebuffed?'}}
      </p>
    </div>
    <div
      class="flex r self-end w-full max-w-[500px] min-h-[72px]  bg-[#3A726B] rounded-tl-[32px] rounded-bl-[32px] rounded-br-[32px] px-8 py-6"
    >
   
      <p class="font-medium text-[16px] md:text-[20px] max-w-[420px]">
        {{answer ?? 'Funds gathered for the procurement of the asset are refunded...'}}
      </p>
    </div>
  </div>
</template>

<script setup lang="ts">
export interface FaqProps {
  question?: string;
  answer?: string;
}
const { question, answer} = defineProps<FaqProps>();
</script>

<style scoped>
.r.q {
  width: calc(100% - 48px);
}
</style>
