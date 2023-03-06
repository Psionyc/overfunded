import { expect } from "chai";
import { ethers } from "hardhat";
import { SignerWithAddress } from "@nomiclabs/hardhat-ethers/signers";
import { PropertyManager } from "../typechain-types/contracts/PropertyManager";
import { Manageable } from "../typechain-types/contracts/Managable.sol/Manageable";
import { BigNumber } from "ethers";
describe("Testing Interconnected contracts", function () {
  let a: SignerWithAddress,
    b: SignerWithAddress,
    c: SignerWithAddress,
    d: SignerWithAddress,
    e: SignerWithAddress;

  before(async () => {
    [a, b, c, d, e] = await ethers.getSigners();
    console.log(
      ethers.utils.formatEther(await (await a.getBalance()).toString())
    );
  });

  after(async () => {
    console.log(
      ethers.utils.formatEther(await (await a.getBalance()).toString())
    );
  });

  async function deploy() {
    const PropertyManager = await ethers.getContractFactory("PropertyManager");
    const OUSD = await ethers.getContractFactory("OverfundedUSD");
    const UserManager = await ethers.getContractFactory("UserManager");
    const ousd = await OUSD.deploy();
    const userManager = await UserManager.deploy();

    const propertyManager = await PropertyManager.deploy(
      ousd.address,
      userManager.address
    );
    return propertyManager;
  }

  async function deploySeperate() {
    const PropertyManager = await ethers.getContractFactory("PropertyManager");
    const OUSD = await ethers.getContractFactory("OverfundedUSD");
    const UserManager = await ethers.getContractFactory("UserManager");
    const ousd = await OUSD.deploy();
    const userManager = await UserManager.deploy();

    const propertyManager = await PropertyManager.deploy(
      ousd.address,
      userManager.address
    );
    return { propertyManager, ousd, userManager };
  }

  describe("Deployment Stages", () => {
    // beforeEach(async () => {
    //   //@ts-ignore
    //   propertyManager = await deploy();
    // });

    it("Can Deploy", async () => {
      const propertyManager = await deploy();
      expect(propertyManager.address).not.to.be.undefined;
    });
    it("Can ascertain correct master", async () => {
      const propertyManager = await deploy();
      expect(
        await (propertyManager as unknown as Manageable).master()
      ).to.be.equal(a.address);
    });
    it("Can ascertain correct property manager", async () => {
      const propertyManager = await deploy();

      expect(propertyManager).not.to.be.undefined;
    });
  });

  describe("Core Functionalites", () => {
    it("Can get all properties", async () => {
      const propertyManager = await deploy();
      const properties = await propertyManager.getProperties(0, 0);
      // console.log(properties);
      expect(properties).to.be.deep.equal([[], 0, 0]);
    });

    it("Can create property and get property", async () => {
      const propertyManager = await deploy();
      await propertyManager.createNewProperty(
        "La Vilas",
        "100000",
        ["dytyatt"],
        "Unknonw"
      );

      const properties = await propertyManager.getProperties(0, 1);
      // console.log(properties);
      expect(properties[0][0].name).to.be.equal("La Vilas");
    });

    it("Ensures property manager is owner of fund storage", async () => {
      const propertyManager = await deploy();
      await propertyManager.createNewProperty(
        "La Vilas",
        "100000",
        ["dytyatt"],
        "Unknonw"
      );

      const property = await propertyManager.getProperty(0);
      const fundStorage = await ethers.getContractAt(
        "FundStorage",
        property.fundStorage
      );
      const owner = await fundStorage.owner();
      expect(propertyManager.address).to.be.equal(owner);
    });

    it("Can fund property minimally", async () => {
      const { propertyManager, ousd } = await deploySeperate();
      await propertyManager.createNewProperty(
        "La Vilas",
        "10000",
        ["dytyatt"],
        "Unknown"
      );

      ousd.connect(a).approve(propertyManager.address, "100");

      await propertyManager.connect(a).fundProperty(0, "100");

      const property = await propertyManager.getProperty(0);

      expect(property.status).to.be.equal(0);
      expect(property.funds).to.be.equal(100);
    });
    it("Can fund property fully", async () => {
      const { propertyManager, ousd } = await deploySeperate();
      await propertyManager.createNewProperty(
        "La Vilas",
        "10000",
        ["dytyatt"],
        "Unknown"
      );

      ousd.connect(a).approve(propertyManager.address, "100000");

      await propertyManager.connect(a).fundProperty(0, "100000");

      const property = await propertyManager.getProperty(0);

      expect(property.status).to.be.equal(1);
      expect(property.funds).to.be.equal(10000);
    });
    it("Property Owner can withdraw when fully funded", async () => {
      const { propertyManager, ousd } = await deploySeperate();
      await propertyManager.createNewProperty(
        "La Vilas",
        "10000",
        ["dytyatt"],
        "Unknown"
      );
      ousd.connect(a).approve(propertyManager.address, "100000");
      await propertyManager.connect(a).fundProperty(0, "100000");
      const property = await propertyManager.getProperty(0);
      await propertyManager.verifyProperty(0);
      await propertyManager.connect(a).withdrawPropertyFund(0);

      const fundStorage = await ethers.getContractAt(
        "FundStorage",
        property.fundStorage
      );

      expect(await ousd.balanceOf(fundStorage.address)).to.be.equal(0);

      // console.log(await fundStorage.getUserShare(a.address));
    });

    it("Can get user share", async () => {
      const { propertyManager, ousd } = await deploySeperate();
      await propertyManager.createNewProperty(
        "La Vilas",
        "2100000",
        ["dytyatt"],
        "Unknown"
      );
      await ousd.connect(a).approve(propertyManager.address, "103");
      await propertyManager.connect(a).fundProperty(0, "103");
      const property = await propertyManager.getProperty(0);
      const fundStorage = await ethers.getContractAt(
        "FundStorage",
        property.fundStorage
      );
      const share = await fundStorage.getUserShare(a.address);
      expect(share).to.be.equal("49047619047619");
    });

    it("Can add profits", async () => {
      //Setup
      const { ousd, propertyManager } = await deploySeperate();
      await propertyManager.createNewProperty(
        "La Vilas",
        "2100000",
        ["dytyatt"],
        "Unknown"
      );
      await ousd.connect(a).approve(propertyManager.address, "103");
      await propertyManager.connect(a).fundProperty(0, "103");
      const property = await propertyManager.getProperty(0);

      const fundStorage = await ethers.getContractAt(
        "FundStorage",
        property.fundStorage
      );

      //Actual
      await ousd.connect(a).approve(propertyManager.address, "20000");
      propertyManager.addProfit(0, "20000");
      const profit = await fundStorage.profit();
      // console.log(profit);
      expect(profit).to.be.equal("20000");
    });

    it("Can Withdraw Profits", async () => {
      //Setup
      const { ousd, propertyManager, userManager } = await deploySeperate();
      await propertyManager.createNewProperty(
        "La Vilas",
        "1000",
        ["dytyatt"],
        "Unknown"
      );
      await ousd.connect(a).approve(propertyManager.address, "103");
      await propertyManager.connect(a).fundProperty(0, "103");
      await ousd.connect(a).approve(propertyManager.address, "103");
      await propertyManager.connect(a).fundProperty(0, "103");
      const property = await propertyManager.getProperty(0);

      const fundStorage = await ethers.getContractAt(
        "FundStorage",
        property.fundStorage
      );

      await ousd.connect(a).approve(propertyManager.address, "2000000");
      propertyManager.addProfit(0, "2000000");
      const profit = await fundStorage.profit();
      // console.log(await ousd.balanceOf(a.address));
      expect(profit).to.be.equal("2000000");

      //Actual
      const withdrawableProfits = await fundStorage.getWithdrawableProfits(
        a.address
      );
      // console.log(withdrawableProfits)
      await propertyManager.withdrawProfits(0);
      const withdrawableProfits2 = await fundStorage.getWithdrawableProfits(
        a.address
      );
      // console.log(withdrawableProfits2)
      expect(withdrawableProfits2).to.be.equal(0);
    });
    it("User manager can accurately get payment data", async () => {
      //Setup
      const { ousd, propertyManager, userManager } = await deploySeperate();
      await propertyManager.createNewProperty(
        "La Vilas",
        "1000",
        ["dytyatt"],
        "Unknown"
      );
      await ousd.connect(a).approve(propertyManager.address, "103");
      await propertyManager.connect(a).fundProperty(0, "103");
      await ousd.connect(a).approve(propertyManager.address, "103");
      await propertyManager.connect(a).fundProperty(0, "103");
      const property = await propertyManager.getProperty(0);

      const fundStorage = await ethers.getContractAt(
        "FundStorage",
        property.fundStorage
      );

      await ousd.connect(a).approve(propertyManager.address, "2000000");
      propertyManager.addProfit(0, "2000000");
      const profit = await fundStorage.profit();
      // console.log(await ousd.balanceOf(a.address));
      expect(profit).to.be.equal("2000000");
      //Actual
      const withdrawableProfits = await fundStorage.getWithdrawableProfits(
        a.address
      );
      await propertyManager.withdrawProfits(0);
      const user = await userManager.getUser(a.address);

      // console.log(user.totalFunds);
      // console.log(user.assetsFunded);

      expect(user.totalFunds).to.be.equal(206);
      expect(user.assetsFunded).to.be.equal(2);
    });

    it("User Manager can set correct username", async () => {
      const { userManager } = await deploySeperate();

      userManager.setUsername("Ionic");

      expect((await userManager.getUser(a.address)).username).to.be.equal(
        "Ionic"
      );
    });

    it("User Manager can set correct username", async () => {
      const { userManager } = await deploySeperate();

      userManager.setUsername("Ionic");

      expect((await userManager.getUser(a.address)).username).to.be.equal(
        "Ionic"
      );
    });

    it("User Manager can set correct username", async () => {
      const { userManager } = await deploySeperate();

      userManager.setUsername("Ionic");

      expect((await userManager.getUser(a.address)).username).to.be.equal(
        "Ionic"
      );
    });

    it("User Manager can set correct logo Url", async () => {
      const { userManager } = await deploySeperate();

      userManager.setUserLogo("anything");

      expect((await userManager.getUser(a.address)).logoUrl).to.be.equal(
        "anything"
      );
    });

    it("User Manager can mint property NFT", async () => {
      const { ousd, propertyManager, userManager } = await deploySeperate();
      await propertyManager.createNewProperty(
        "La Vilas",
        "1000",
        ["dytyatt"],
        "Unknown"
      );
      await ousd.connect(a).approve(propertyManager.address, "103");
      await propertyManager.connect(a).fundProperty(0, "103");
      await ousd.connect(a).approve(propertyManager.address, "103");
      await propertyManager.connect(a).fundProperty(0, "103");

      const tx = await userManager.mintPropertyNFT(0, "anything");

      expect(tx).not.to.be.reverted;
    });
  });
});
