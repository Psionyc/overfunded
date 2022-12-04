<template>
  <div class="home_view w-full h-full bg-[#181818] px-2 lg:px-12">
    <Navbar />

    <section class="landing w-full flex flex-col-reverse items-center md:gap-2 md:justify-between md:flex-row">
      <!-- Landing text and image -->

      <div class="flex flex-col gap-6 md:mt-[100px]">
        <h1 class="font-semibold text-[32px] lg:text-[40px] text-center md:text-start">
          Next-Gen incentivized crowdfunding on the Polygon Ecosystem
        </h1>

        <!-- CTA -->

        <router-link to="/fund">
          <button
            class="font-medium text-[20px] bg-main/60 w-full md:w-[240px] px-4 py-2 rounded-[12px]"
          >
            Fund Now
          </button>
        </router-link>

        <!-- Quote -->

        <div class="flex gap-4 w-[326px] items-center">
          <div
            class="quote-stick w-[7px] h-[72px] bg-gradient-to-b from-gradient-start to-gradient-stop rounded-full"
          ></div>
          <h3 class="text-white font-semibold text-[16px]">
            Get High ROI Investments by sharing and funding
          </h3>
        </div>
      </div>

      <img
        src="@/assets/images/landing_images.png"
        alt="Unknown"
        class="w-full lg:max-w-[700px] md:max-w-[400px]"
      />
    </section>

    <section
      name="Perks"
      v-show="false"
      class="w-full h-[360px] bg-main/20 rounded-[32px] mt-16 px-[5%] justify-between flex relative overflow-visible"
    >
      <div class="top-[30%] squiggly left-[-50px] z-[-1] absolute">
        <img src="@/assets/images/squiggly.svg" class="w-full" />
      </div>

      <div
        class="rounded-full w-[270px] h-[270px] bg-bluish relative mt-[20px]"
      >
        <div
          class="absolute rounded-full w-[60px] h-[60px] p-2 bg-greyish left-[10px] grid place-items-center"
        >
          <img
            src="@/assets/images/stats.svg"
            class="w-[30px] h-[30px]"
            alt=""
            srcset=""
          />
        </div>

        <div class="flex flex-col justify-center items-center gap-6 pt-16">
          <p class="font-bold text-[28px]">High ROIs</p>
          <p class="font-semibold text-[20px]">
            Great returns for shares
          </p>
        </div>
      </div>
      <div
        class="rounded-full w-[270px] h-[270px] bg-greenish relative mt-[75px]"
      >
        <div
          class="absolute rounded-full w-[60px] h-[60px] p-2 bg-greyish left-[10px] grid place-items-center"
        >
          <img
            src="@/assets/images/shield.svg"
            class="w-[30px] h-[30px]"
            alt=""
            srcset=""
          />
        </div>

        <div class="flex flex-col justify-center items-center gap-6 pt-16">
          <p class="font-bold  text-[28px]">Security</p>
          <p class="font-semibold text-center text-[20px] max-w-[200px]">
            Guaranteed protection on each asset
          </p>
        </div>
      </div>
      <div
        class="rounded-full w-[270px] h-[270px] bg-bluish relative mt-[20px]"
      >
        <div
          class="absolute rounded-full w-[60px] h-[60px] p-2 bg-greyish left-[10px] grid place-items-center"
        >
          <img
            src="@/assets/images/connect.svg"
            class="w-[30px] h-[30px]"
            alt=""
            srcset=""
          />
        </div>

        <div class="flex flex-col justify-center items-center gap-6 pt-16">
          <p class="font-bold text-[28px]">Connection</p>
          <p class="font-semibold text-[20px] max-w-[200px] text-center">
            Connect with resources over the world with lower risks
          </p>
        </div>
      </div>
      
    </section>

    <section class="w-full mt-16" >
      <div class="flex gap-2 w-full mt-6 items-center">
        <div
          class="quote-stick w-[7px] h-[30px] bg-gradient-to-b from-gradient-start to-gradient-stop rounded-full"
        ></div>
        <h2 class="font-semibold text-[32px]">Q&A</h2>
      </div>
      <Faq />
      <Faq question="How are incentives distributed?" answer="Incentives are distributed based on the amount the funders funded..."/>
    </section>
    <section name="Stats" class="w-full mt-16">
      <div class="flex gap-2 w-full mt-6 items-center">
        <div
          class="quote-stick w-[7px] h-[30px] bg-gradient-to-b from-gradient-start to-gradient-stop rounded-full"
        ></div>
        <h2 class="font-semibold text-[32px]">Stats</h2>
      </div>

      <div class="flex flex-col md:flex-row gap-y-12 w-full items-center md:justify-between md:gap-4 pt-20">
        <div class="w-full rounded-[32px] h-[225px] bg-dark-bluish relative">
          <div
            class="absolute rounded-full w-[80px] h-[80px] bg-greyish top-[-40px] left-[50%] translate-x-[-50%] grid place-items-center"
          >
            <img src="@/assets/images/dollar.svg" alt="" srcset="" />
          </div>
          <div class="flex flex-col justify-center items-center gap-6 pt-12">
            <p class="font-bold text-[20px]">Funds Raised</p>
            <p class="font-bold text-[48px]">
              101M+ <span class="text-bold text-[18px]">OUSD</span>
            </p>
          </div>
        </div>
        <div class="w-full rounded-[32px] h-[225px] bg-dark-greenish relative">
          <div
            class="absolute rounded-full w-[80px] h-[80px] bg-greyish top-[-40px] left-[50%] translate-x-[-50%] grid place-items-center"
          >
            <img src="@/assets/images/assets.svg" alt="" srcset="" />
          </div>
          <div class="flex flex-col justify-center items-center gap-6 pt-12">
            <p class="font-bold text-[20px]">Procured Assets</p>
            <p class="font-bold text-[48px]">
              25,346 <span class="text-bold text-[18px]">Assets</span>
            </p>
          </div>
        </div>
      </div>
    </section>

    <OVFooter />
  </div>
</template>

<script setup lang="ts">
import { Navbar, Faq, OVFooter } from "@/components";
import { RouterLink } from "vue-router";
</script>

<style scoped lang="scss">
.squiggly {
  width: calc(100% + 100px);
}
</style>
