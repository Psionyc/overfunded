export const USER_MANAGER_CONTRACT = import.meta.env.VITE_USER_MANAGER
export const PROPERTY_MANAGER_CONTRACT = import.meta.env.VITE_PROPERTY_MANAGER
export const OUSD_CONTRACT = import.meta.env.VITE_OUSD
export const BACKEND_URL = import.meta.env.VITE_BACKEND_URL

export const NETWORK_PARAMETERS = {
    //0x13881
    chainId: import.meta.env.VITE_CHAIN_ID,
    rpcUrls: [import.meta.env.VITE_NETWORK_URL],
    chainName: import.meta.env.VITE_CHAIN_NAME,
    nativeCurrency: {
      name: import.meta.env.VITE_CURRENCY_NAME,
      symbol: import.meta.env.VITE_CURRENCY_SYMBOL,
      decimals: 18,
    },
    blockExplorerUrls: ["http://127.0.0.1:8545/"],
}