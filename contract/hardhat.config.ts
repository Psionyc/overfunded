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
        process.env.PRIVATE_KEY_1 ?? "0d647a62d6c707605360eb066d2f6fc23fe5c005fa6c2f5590b609e503102320"
      ]
    }
  }
};

export default config;
