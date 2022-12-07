import { ref, computed, handleError } from "vue";
import { defineStore } from "pinia";
import { Contract, ethers, Signer } from "ethers";
import type {
  UserStructOutput,
  UserManager,
} from "@/typechain-types/contracts/UserManager";
import UserManagerJson from "@/artifacts/contracts/UserManager.sol/UserManager.json";
import { EventManager } from "@/main";
import { NETWORK_PARAMETERS, USER_MANAGER_CONTRACT } from "@/config";
import { ToastType } from "@/events";
import { Property } from "@/models/Property";

let provider: ethers.providers.Web3Provider | null = null;
let signer: Signer | null = null;
let userManager: (UserManager & Contract) | null = null;

export const ETH_STUFF = { provider, signer, userManager };

export const usewalletStore = defineStore("wallet", () => {
  const wallet = ref();
  const isConnected = ref<boolean>(false);
  const user = ref<UserStructOutput>();
  const isLoading = ref<boolean>(false);

  function _handleError(e: any) {
    if (e.code == "ACTION_REJECTED")
      EventManager.emit("toast", {
        message: "Transaction Rejected",
        type: ToastType.ERROR,
      });
    else
      EventManager.emit("toast", {
        message: "Transaction failed",
        type: ToastType.ERROR,
      });
  }

  async function _getOrRefreshUser() {
    isLoading.value = true;
    try {
      if (userManager) user.value = await userManager.getUser(wallet.value);
      isLoading.value = false;
      return user.value;
    } catch (e) {
      isLoading.value = false;
      _handleError(e);
    }
  }

  EventManager.on("dataUpdated", async () => {
    await _getOrRefreshUser();
  });

  async function connect() {
    if (isConnected.value) return;
    try {
      await (window as any).ethereum.request({
        method: "wallet_addEthereumChain",
        params: [NETWORK_PARAMETERS],
      });

      const accounts = await (window as any).ethereum.request({
        method: "eth_requestAccounts",
      });
      wallet.value = accounts[0];
      provider = new ethers.providers.Web3Provider((window as any).ethereum);
      signer = provider.getSigner();
      userManager = new ethers.Contract(
        USER_MANAGER_CONTRACT!,
        UserManagerJson.abi,
        signer
      ) as UserManager;
      isConnected.value = true;
      await _getOrRefreshUser();
      EventManager.emit("connectOrUpdatedUser");
    } catch (e) {
      EventManager.emit("toast", {
        message: "An error occured",
        type: ToastType.ERROR,
      });
    }
  }

  function disconnect() {
    console.log("Disconnecting...");
    wallet.value = null;
    isConnected.value = false;
  }

  async function getUser() {
    return _getOrRefreshUser();
  }

  const walletAddressOrUsername = computed(() => {
    if (!isConnected.value) return null;
    if (user.value?.username) return user.value.username;
    return (
      (wallet.value as string).slice(0, 4) +
      "..." +
      wallet.value.slice(wallet.value.length - 4, wallet.value.length)
    );
  });

  const walletAddress = computed(() => {
    if (!isConnected.value) return null;
    return (
      (wallet.value as string).slice(0, 4) +
      "..." +
      wallet.value.slice(wallet.value.length - 4, wallet.value.length)
    );
  });

  const changeUsername = async (username: string) => {
    try {
      const tx = await userManager?.setUsername(username);
      await tx?.wait();
      EventManager.emit("toast", {
        message: "Username changed successfully",
        type: ToastType.SUCCESS,
      });
      EventManager.emit("dataUpdated");
    } catch (e) {
      _handleError(e);
    }
  };

  const changeLogoUrl = async (logoUrl: string) => {
    try {
      const tx = await userManager?.setUserLogo(logoUrl);
      await tx?.wait();
      EventManager.emit("toast", {
        message: "Logo Url changed successfully",
        type: ToastType.SUCCESS,
      });
      EventManager.emit("dataUpdated");
    } catch (e) {
      _handleError(e);
    }
  };

  const mintPropertyNFT = async (funding:number, uri: string) => {
    try {
      
      const tx = await userManager?.mintPropertyNFT(funding, uri);
      await tx?.wait()

      EventManager.emit('toast', {message: "NFT minted successfully", type: ToastType.SUCCESS})
      EventManager.emit('dataUpdated')
      
    } catch (e) {
      _handleError(e);
    }
  };

  return {
    wallet,
    connect,
    disconnect,
    walletAddressOrUsername,
    isConnected,
    getUser,
    user,
    walletAddress,
    isLoading,
    changeLogoUrl,
    changeUsername,
    mintPropertyNFT,
  };
});
