import { time, loadFixture } from "@nomicfoundation/hardhat-network-helpers";
import { anyValue } from "@nomicfoundation/hardhat-chai-matchers/withArgs";
import { expect } from "chai";
import { ethers } from "hardhat";
import { SignerWithAddress } from "@nomiclabs/hardhat-ethers/signers";
import { OverfundedManager } from "../typechain-types";

describe("Overfunded", function () {
  // We define a fixture to reuse the same setup in every test.
  // We use loadFixture to run this setup once, snapshot that state,
  // and reset Hardhat Network to that snapshot in every test.
  let a: SignerWithAddress,
    b: SignerWithAddress,
    c: SignerWithAddress,
    d: SignerWithAddress,
    e: SignerWithAddress;

  before(async () => {
    [a, b, c, d, e] = await ethers.getSigners();
  });

  async function deploy() {
    const Overfunded = await ethers.getContractFactory("OverfundedManager");
    const OUSD = await ethers.getContractFactory("OverfundedUSD");
    const ousd = await OUSD.deploy();
    const overfunded = await Overfunded.deploy(ousd.address);
    return overfunded;
  }

  describe("Deployment Stages", () => {
    let overfunded: OverfundedManager;

    beforeEach(async () => {
      overfunded = await deploy();
    });
    it("Can Deploy", async () => {
      expect(overfunded.address).not.to.be.undefined;
    });
    it("Can ascertain correct master", async () => {
      expect(await overfunded.master()).to.be.equal(a.address);
    });
    it("Can ascertain correct property manager", async () => {
      console.log(await overfunded.propertyManager());
      expect(await overfunded.propertyManager()).not.to.be.undefined;
    });
  });
});
