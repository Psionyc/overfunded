import { HardhatUserConfig } from "hardhat/config";
import "@nomicfoundation/hardhat-toolbox";
import { privateKey1 } from "./user.config";

const config: HardhatUserConfig = {
  solidity: "0.8.17",
  
  networks: {
    mumbai :{
      url: "https://rpc-mumbai.maticvigil.com",
      chainId: 80001,
      accounts: [
        process.env.PRIVATE_KEY_1!
      ]
    },
    polygon :{
      url: "https://polygon-rpc.com",
      chainId: 137,
      accounts: [
        process.env.PRIVATE_KEY_1!
      ]
    }
  }
};

export default config;
