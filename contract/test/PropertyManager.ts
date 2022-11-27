import { time, loadFixture } from "@nomicfoundation/hardhat-network-helpers";
import { anyValue } from "@nomicfoundation/hardhat-chai-matchers/withArgs";
import { expect } from "chai";
import { ethers } from "hardhat";
import { SignerWithAddress } from "@nomiclabs/hardhat-ethers/signers";
import { Manageable, OverfundedManager } from "../typechain-types";
import { PropertyManager } from "../typechain-types/contracts/PropertyManager.sol";
import { BigNumber } from "ethers";

describe("Property Manger", function () {
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
    const PropertyManager = await ethers.getContractFactory("PropertyManager");
    const OUSD = await ethers.getContractFactory("OverfundedUSD");
    const ousd = await OUSD.deploy();
    console.log(await ousd.balanceOf(a.address));
    const overfunded = await PropertyManager.deploy(ousd.address);
    return overfunded;
  }

  describe("Deployment Stages", () => {
    let propertyManager: PropertyManager;
    beforeEach(async () => {
      //@ts-ignore
      propertyManager = await deploy();
    });

    it("Can Deploy", async () => {
      expect(propertyManager.address).not.to.be.undefined;
    });
    it("Can ascertain correct master", async () => {
      expect(
        await (propertyManager as unknown as Manageable).master()
      ).to.be.equal(a.address);
    });
    it("Can ascertain correct property manager", async () => {
      console.log(await propertyManager.address);
      expect(await propertyManager).not.to.be.undefined;
    });
  });

  describe("Core Functionalites", () => {
    let propertyManager: PropertyManager;
    beforeEach(async () => {
      //@ts-ignore
      propertyManager = await deploy();
    });

    it("Can get all properties", async () => {
      const properties = await propertyManager.getProperties(0, 0);
      console.log(properties);
      expect(properties).to.be.deep.equal([[], 0, 0]);
    });

    it("Can create property and get property", async () => {
      await propertyManager.createNewProperty(
        "La Vilas",
        "10000000000000000000000000000000000000000",
        ["dytyatt"],
        "Unknonw",
        0,
        0
      );

      const properties = await propertyManager.getProperties(0, 1);
      console.log(properties);
      expect(properties[0][0].name).to.be.equal("La Vilas");
    });

    it("Ensures property manager is owner of fund storage", async () => {
      await propertyManager.createNewProperty(
        "La Vilas",
        "10000000000000000000000000000000000000000",
        ["dytyatt"],
        "Unknonw",
        0,
        0
      );

      const property = await propertyManager.getProperty(0);
      const fundStorage = await ethers.getContractAt(
        "FundStorage",
        property.fundStorage
      );
      const owner = await fundStorage.owner();
      console.log(propertyManager.address);
      console.log(owner);
      expect(propertyManager.address).to.be.equal(owner);
    });

    it("Can fund property", async () => {
      
      await propertyManager.createNewProperty(
        "La Vilas",
        "10000000000000000000000000000000000000000",
        ["dytyatt"],
        "Unknown",
        0,
        0
      );
      
      

      await propertyManager.connect(a).fundProperty(0, "1000");

      const property = await propertyManager.getProperty(0);

      console.log(property.funds);
    });
  });
});
