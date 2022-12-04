import { ethers } from "hardhat";

async function main() {
  const [signer1] = await ethers.getSigners()
  await signer1.sendTransaction({
    to: "0xCCaBbf41bc7121135673e683c3228A4DBA1FB6d8",
    value: ethers.utils.parseEther("10"), // Sends exactly 1.0 ether
  });
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.0x7289D6Edc290D41a3aEa9537Fe9eABF56E28F15D
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
