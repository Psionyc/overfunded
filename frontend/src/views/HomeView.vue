<template>
  <div class="home_view w-full h-full lg:px-12">
    <div class="fixed w-full h-full -z-10 blur-[9px]">
      
      <img
        src="@/assets/images/bg-ellipse.svg"
        data-lag="0s"
        class="animatable h-[100px] w-[100px] fixed bottom-[100px] right-[100px] md:bottom-[200ox] md:right-[10vw]"
        alt=""
        srcset=""
      />
      <img
        src="@/assets/images/bg-polygon.svg "
        class="animatable h-[100px] w-[100px] fixed top-[100px] left-[10px]"
        alt=""
        srcset=""
        data-lag="0.5s"
      />
 
    </div>
    <Navbar />
    <div class="px-2">
      <section
        class="landing w-full flex flex-col items-center md:gap-2 md:justify-between md:flex-row"
      >
        <!-- Landing text and image -->

        <div class="flex flex-col gap-6 md:mt-[100px]">
          <h1
            class="font-semibold text-[28px] lg:text-[40px] text-center md:text-start"
          >
            Next-Gen incentivized crowdfunding on the Polygon Ecosystem
          </h1>

          <img
            src="@/assets/images/landing_images.png"
            alt="Unknown"
            class="w-full lg:max-w-[700px] md:max-w-[400px] md:hidden"
          />

          <div class="flex gap-4 w-[326px] items-center">
            <div
              class="quote-stick w-[7px] h-[40px] bg-gradient-to-b from-gradient-start to-gradient-stop rounded-full"
            ></div>
            <h3 class="text-white font-semibold text-[16px]">
              Get High ROI Investments by sharing and funding
            </h3>
          </div>
          <!-- CTA -->

          <router-link to="/fund">
            <button
              class="font-medium text-[18px] bg-main/60 w-full md:w-[240px] px-4 py-2 rounded-[12px]"
            >
              Fund Now
            </button>
          </router-link>

          <!-- Quote -->
        </div>

        <img
          src="@/assets/images/landing_images.png"
          alt="Unknown"
          class="w-full lg:max-w-[700px] md:max-w-[400px] hidden md:block"
        />
      </section>

      <section name="Perks" data-aos="fade-up">
        <div class="flex gap-2 w-full mt-6 items-center">
          <div
            class="quote-stick w-[7px] h-[30px] bg-gradient-to-b from-gradient-start to-gradient-stop rounded-full"
          ></div>
          <h2 class="font-semibold text-[24px]">Perks</h2>
        </div>
        <div
          class="w-full md:h-[360px] flex flex-col gap-4 py-4 md:py-0 md:gap-0 items-center md:items-start lg:flex-row md:bg-main/20 rounded-[32px] mt-16 px-[5%] justify-between relative overflow-visible"
        >
          <div
            class="top-[30%] hidden md:block squiggly left-[-50px] z-[-1] absolute"
          >
            <img src="@/assets/images/squiggly.svg" class="w-full" />
          </div>
          <div
            class="rounded-full w-[270px] h-[270px] bg-dark-bluish relative md:mt-[20px]"
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
            <div class="flex flex-col h-full justify-center items-center gap-3">
              <p class="font-bold text-[24px]">High ROIs</p>
              <p class="font-semibold text-[18px] text-center px-2">
                Great massive returns for shares
              </p>
            </div>
          </div>
          <div
            class="rounded-full w-[270px] h-[270px] bg-dark-greenish relative md:mt-[75px]"
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
            <div class="flex flex-col h-full justify-center items-center gap-3">
              <p class="font-bold text-[24px]">Security</p>
              <p class="font-semibold text-center text-[18px] max-w-[200px]">
                Guaranteed fund protection on each asset
              </p>
            </div>
          </div>
          <div
            class="rounded-full w-[270px] h-[270px] bg-dark-bluish relative md:mt-[20px]"
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
            <div class="flex flex-col h-full justify-center items-center gap-3">
              <p class="font-bold text-[24px]">Connection</p>
              <p class="font-semibold text-[18px] max-w-[200px] text-center">
                Connect with assets all over the world with lower risks
              </p>
            </div>
          </div>
        </div>
      </section>

      <section data-aos="fade-up" class="w-full mt-16">
        <div class="flex gap-2 w-full mt-6 items-center">
          <div
            class="quote-stick w-[7px] h-[30px] bg-gradient-to-b from-gradient-start to-gradient-stop rounded-full"
          ></div>
          <h2 class="font-semibold text-[24px]">Q&A</h2>
        </div>
        <Faq />
        <Faq
          question="How are incentives distributed?"
          answer="Incentives are distributed based on the shares gotten during the funding stage..."
        />
      </section>
      <section data-aos="fade-up" name="Stats" class="w-full mt-16">
        <div class="flex gap-2 w-full mt-6 items-center">
          <div
            class="quote-stick w-[7px] h-[30px] bg-gradient-to-b from-gradient-start to-gradient-stop rounded-full"
          ></div>
          <h2 class="font-semibold text-[24px]">Stats</h2>
        </div>

        <div
          class="flex flex-col md:flex-row gap-y-12 w-full items-center md:justify-between md:gap-4 pt-20"
        >
          <div
            class="w-full rounded-[32px] h-[180px] md:h-[225px] bg-dark-bluish relative"
          >
            <div
              class="absolute rounded-full w-[60px] h-[60px] md:w-[80px] md:h-[80px] bg-greyish top-[-30px] md:top-[-40px] left-[50%] translate-x-[-50%] grid place-items-center"
            >
              <img src="@/assets/images/dollar.svg" alt="" srcset="" />
            </div>
            <div class="flex flex-col justify-center items-center gap-6 pt-12">
              <p class="font-bold text-[16px] md:text-[20px]">Funds Raised</p>
              <p class="font-bold text-[28px] md:text-[32px] lg:text-[48px]">
                101M+ <span class="text-bold text-[18px]">OUSD</span>
              </p>
            </div>
          </div>
          <div
            class="w-full rounded-[32px] h-[180px] md:h-[225px] bg-dark-greenish relative"
          >
            <div
              class="absolute rounded-full w-[60px] h-[60px] md:w-[80px] md:h-[80px] bg-greyish top-[-30px] md:top-[-40px] left-[50%] translate-x-[-50%] grid place-items-center"
            >
              <img src="@/assets/images/assets.svg" alt="" srcset="" />
            </div>
            <div class="flex flex-col justify-center items-center gap-6 pt-12">
              <p class="font-bold text-[16px] md:text-[20px]">
                Procured Assets
              </p>
              <p class="font-bold text-[28px] md:text-[32px] lg:text-[48px]">
                25,346 <span class="text-bold text-[18px]">Assets</span>
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>

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
@keyframes move {
  0% {
    transform: translateY(-100px) translateX(20px);
  }
  25% {
    transform: translateY(-100px) translateX(40px);
  }
  50% {
    transform: translateY(-50px) translateX(80px);
  }
  75% {
    transform: translateY(-0px) translateX(100px);
  }
  100% {
    transform: translateY(-100px) translateX(20px);
  }
}

.animatable {
  animation: move;
  animation-iteration-count: infinite;
  animation-timing-function: ease-in-out;
  animation-play-state: running;
  animation-duration: 7s;
  animation-delay: attr(data-lag);
  
}


</style>
