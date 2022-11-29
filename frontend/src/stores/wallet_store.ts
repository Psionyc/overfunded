import { ref, computed } from "vue";
import { defineStore } from "pinia";
import { Contract, ethers } from "ethers";
import type { User } from "@/models/User";

export const usewalletStore = defineStore("wallet", () => {
  const wallet = ref();
  const isConnected = ref<boolean>(false);
  const userData = ref<User>()

  const provider = ref<ethers.providers.Web3Provider>();
  const signer = ref<ethers.Signer>();
  const contract = ref<Contract>();

  async function _getUser(address: string) {
    //Try to get user from User Manager Contract;
    userData.value = {
      username: "Daniels",
    }
  }

  //Test Get Wallet Address

  async function connect() {
    const accounts = await (window as any).ethereum.request({
      method: "eth_requestAccounts",
    });
    console.table(accounts);
    wallet.value = accounts[0];
    _getUser(wallet.value)
    provider.value = new ethers.providers.Web3Provider(
      (window as any).ethereum
    );

    signer.value = provider.value.getSigner();
    // contract.value = new ethers.Contract()
    isConnected.value = true;
  }

  function disconnect() {
    console.log("Disconnecting...");
    wallet.value = null;
    isConnected.value = false;
  }

  const user = computed(() => {
    if (!isConnected.value) return null;
    if(userData.value) return userData.value.username;
    return (
      (wallet.value as string).slice(0, 4) +
      "..." +
      wallet.value.slice(wallet.value.length - 5, wallet.value.length - 1)
    );
  });

  return { wallet, connect, disconnect, user, isConnected };
});
