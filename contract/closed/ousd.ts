import { expect } from "chai";
import { ethers } from "hardhat";
import { SignerWithAddress } from "@nomiclabs/hardhat-ethers/signers";
import { Manageable, PropertyManager } from "../typechain-types";

describe("Overfunded USD", function () {
  let a: SignerWithAddress,
    b: SignerWithAddress,
    c: SignerWithAddress,
    d: SignerWithAddress,
    e: SignerWithAddress;

  before(async () => {
    [a, b, c, d, e] = await ethers.getSigners();
  });

  async function deploy() {
    const OUSD = await ethers.getContractFactory("OverfundedUSD");
    const ousd = await OUSD.deploy();
    console.log(ousd.address);
    return ousd;
  }

  describe("Deployment Stages", () => {
    it("Can deploy", async () => {
      await deploy();
    });
    it("Can get accurate balances", async () => {
      const ousd = await deploy();
      const balance = ousd.balanceOf(a.address);
    });
    it("Can transfer and get accurate balances", async () => {
      const ousd = await deploy();
      console.log("Before");
      console.log(await ousd.balanceOf(a.address));
      console.log(await ousd.balanceOf(b.address));
      await ousd.transfer(b.address, "10000");
      console.log("After");
      const B_balance = await ousd.balanceOf(b.address);
      console.log(await ousd.balanceOf(a.address));
      console.log(B_balance);
      expect(B_balance).to.be.equal(10000);
    });
  });
});
