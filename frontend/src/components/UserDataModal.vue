<template>
  <div
    v-show="show"
    class="w-[100%] pt-4 user-data-modal max-w-[400px] h-[100vh] rounded-tl-[32px] rounded-bl-[32px] bg-dark-bluish fixed top-0 right-0 flex flex-col items-center"
  >
    <div
      @click="EventManager.emit(`closeModal`)"
      class="fixed bg-greenish w-[40px] h-[40px] right-[10px] top-[20px] p-2 grid place-items-center rounded-full"
    >
      <img src="@/assets/images/close.svg" class="w-[80%]" alt="" srcset="" />
    </div>
    <div
      class="grid place-items-center w-[180px] h-[180px] min-h-[180px] bg-gray-200 rounded-full overflow-clip"
    >
      <img
        v-if="userDataState.logoUrl == ''"
        src="@/assets/images/avatar.svg"
        class="h-[165px] w-[165px] rounded-full"
        alt=""
        srcset=""
      />
      <img
        v-else
        :src="userDataState.logoUrl"
        class="h-[170px] w-[170px] rounded-full object-cover"
        alt=""
        srcset=""
      />
    </div>
    <p
      v-if="userDataState.username == ''"
      class="font-semibold text-[18px] my-4"
    >
      <span>{{ walletStore.walletAddress }}</span>
    </p>
    <p v-else class="font-semibold text-[18px] my-4">
      {{ userDataState.username }}(<span>{{ walletStore.walletAddress }})</span>
    </p>
    <div class="flex rounded-full bg-black/20 w-[90%] items-center mb-4">
      <input
        v-model="inputState.username"
        placeholder="Username"
        type="text"
        class="w-full px-4 bg-transparent border-none outline-none"
      />
      <button
        class="font-semibold px-2 py-2 bg-greenish rounded-full min-w-[120px] flex items-center justify-center gap-2"
        @click="changeUsername"
        :disabled="!walletStore.isConnected || loading"
      >
        <svg
          v-if="loadingState.changingUsername"
          class="animate-spin max-h-[16px] min-w-[16px] text-white"
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
        <p v-if="loadingState.changingUsername">Changing</p>
        <p v-else>Change</p>
      </button>
    </div>
    <div class="flex rounded-full bg-black/20 w-[90%] items-center mb-4">
      <input
        v-model="inputState.logoUrl"
        placeholder="Logo Url"
        type="text"
        class="w-full px-4 bg-transparent border-none outline-none"
      />
      <button
        class="font-semibold px-2 py-2 bg-greenish rounded-full min-w-[120px] flex items-center justify-center gap-2"
        @click="changeLogoUrl"
        :disabled="!walletStore.isConnected || loading"
      >
        <svg
          v-show="loadingState.changingLogoUrl"
          class="animate-spin max-w-[16px] max-h-[16px] text-white"
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
        <p v-if="loadingState.changingLogoUrl">Changing</p>
        <p v-else>Change</p>
      </button>
    </div>

    <div class="overflow-scroll w-full h-full">
      <div v-if="(userDataState.fundings.length <= 0)" class="grid place-items-center h-[300px]">
        <p>You haven't funded any property yet</p>
      </div>
      <div
      v-else
        v-for="(funding, index) in userDataState.fundings"
        class="flex bg-black/20 w-full mb-4 px-4 py-2"
      >
        <img
          :src="funding.property.baseImage"
          class="h-[80px] w-[80px] rounded-full object-cover"
          alt=""
          srcset=""
        />
        <div class="flex flex-col gap-2 ml-6">
          <p class="font-semibold text-[18px] flex items-center">
            {{ funding.property.name }}
            <span class="text-greenish text-[12px] ml-2 font-bold">
              (+{{
                formatter.format(
                  (funding.amount.toNumber() /
                    funding.property.price.toNumber()) *
                    100
                )
              }}% Share)</span
            >
          </p>
          <p>
            Priced at
            <span class="font-bold"
              >${{
                formatCommas.format(funding.property.price.toNumber())
              }}</span
            >
          </p>
          <p>
            You funded
            <span class="font-bold"
              >${{ formatCommas.format(funding.amount.toNumber()) }}</span
            >
          </p>
          <button
        class="font-semibold px-2 py-2 bg-greenish rounded-full w-[120px] min-w-[120px] flex items-center justify-center gap-2"
        @click="mintPropertyNFT(index)"
        :disabled="!walletStore.isConnected || loading"
      >
        <svg
          v-if="loadingState.mintingNFT"
          class="animate-spin max-h-[16px] min-w-[16px] text-white"
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
        <p v-if="loadingState.mintingNFT">Minting</p>
        <p v-else>Mint</p>
      </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { EventManager } from "@/main";
import { usewalletStore } from "@/stores/wallet_store";
import { computed, onMounted, reactive, ref } from "vue";
import type { UserFundingStructOutput } from "../../../contract/typechain-types/contracts/UserManager";
import { animate } from "motion";
import { ToastType } from "@/events";
interface UserDataState {
  username: string;
  fundings: UserFundingStructOutput[];
  totalFunding: number;
  logoUrl: string;
}

const formatCommas = Intl.NumberFormat("en-Us", {
  currency: "USD",
  notation: "standard",
});

const loadingState = reactive({
  changingUsername: false,
  changingLogoUrl: false,
  mintingNFT: false,
});

const loading = computed(() => {
  return loadingState.changingLogoUrl || loadingState.changingUsername || loadingState.mintingNFT;
});

const userDataState = reactive<UserDataState>({
  username: "",
  fundings: [],
  totalFunding: 0,
  logoUrl: "",
});

const inputState = reactive({
  username: userDataState.username,
  logoUrl: userDataState.logoUrl,
});

const show = ref(false);

const walletStore = usewalletStore();

EventManager.on("connectOrUpdatedUser", () => {
  const user = walletStore.user;
  userDataState.username = user!.username;
  inputState.username = user!.username;
  userDataState.fundings = user!.fundings;
  userDataState.totalFunding = user!.totalFunds.toNumber();
  userDataState.logoUrl = user!.logoUrl;
});
EventManager.on("dataUpdated", async () => {
  const user = await walletStore.getUser();
  inputState.username = user!.username;
  userDataState.username = user!.username;
  userDataState.fundings = user!.fundings;
  userDataState.totalFunding = user!.totalFunds.toNumber();
  userDataState.logoUrl = user!.logoUrl;
});

EventManager.on("openUserDataModal", async (e) => {
  await animateIn();
});

EventManager.on("closeModal", async () => {
  await animateOut();
});

const formatter = Intl.NumberFormat("en", {
  maximumFractionDigits: 2,
  minimumFractionDigits: 0,
});

const animateIn = async () => {
  show.value = true;
  //   await animate(
  //     ".user-data-modal",
  //     {
  //       width: "100%",
  //     },
  //     {
  //       duration: 1,
  //     }
  //   ).finished;
};
const animateOut = async () => {
  //   await animate(
  //     ".user-data-modal",
  //     {
  //       width: "0%",
  //     },
  //     {
  //       duration: 1,
  //     }
  //   ).finished;

  show.value = false;
};

const changeUsername = async () => {
  if (inputState.username == "") {
    return EventManager.emit("toast", {
      message: "Username field is empty",
      type: ToastType.WARNING,
    });
  }
  if (inputState.username == userDataState.username) {
    return EventManager.emit("toast", {
      message: "Username is same as in database",
      type: ToastType.WARNING,
    });
  }
  loadingState.changingUsername = true;
  await walletStore.changeUsername(inputState.username);
  loadingState.changingUsername = false;
};

const changeLogoUrl = async () => {
  if (inputState.logoUrl == "") {
    return EventManager.emit("toast", {
      message: "Logo Url field is empty",
      type: ToastType.WARNING,
    });
  }
  if (inputState.logoUrl == userDataState.logoUrl) {
    return EventManager.emit("toast", {
      message: "Logo Url is same as in database",
      type: ToastType.WARNING,
    });
  }
  loadingState.changingLogoUrl = true;
  await walletStore.changeLogoUrl(inputState.logoUrl);
  loadingState.changingLogoUrl = false;
};
const mintPropertyNFT =async (index: number) =>{

  loadingState.mintingNFT = true;
  await walletStore.mintPropertyNFT(index).finally(()=>{
    loadingState.mintingNFT = false
  });

}
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

.user-data-modal {
  box-shadow: -2px 0px 4px 1px rgba(0, 0, 0, 0.71);
}
</style>
