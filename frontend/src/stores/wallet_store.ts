import { ref, computed } from "vue";
import { defineStore } from "pinia";
import { Contract, ethers } from "ethers";

export const usewalletStore = defineStore("wallet", () => {
  const wallet = ref();
  const isConnected = ref<boolean>(false)

  const provider = ref<ethers.providers.Web3Provider>();
  const signer = ref<ethers.Signer>();
  const contract = ref<Contract>();

  //Test Get Wallet Address


  async function connect() {
    const accounts = await (window as any).ethereum.request({method: "eth_requestAccounts"})
    console.table(accounts);
    wallet.value = accounts[0];
    provider.value = new ethers.providers.Web3Provider((window as any).ethereum)
  
    signer.value = provider.value.getSigner()
    // contract.value = new ethers.Contract()
    isConnected.value = true
  }

  function disconnect() {
    console.log("Disconnecting...")
    wallet.value = null;
    isConnected.value  = false;
  }

  const user = computed(()=> {
    if(!isConnected.value) return null;
    return (wallet.value as string).slice(0,4) + "..." + wallet.value.slice(wallet.value.length - 5, wallet.value.length -1)
  });

  return { wallet, connect, disconnect, user, isConnected };
});
