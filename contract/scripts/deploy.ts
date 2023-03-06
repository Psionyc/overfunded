import { ethers } from "hardhat";

async function main() {
  const [signer1] = await ethers.getSigners();
  const PropertyManager = await ethers.getContractFactory("PropertyManager");
  const OUSD = await ethers.getContractFactory("OverfundedUSD");
  const UserManager = await ethers.getContractFactory("UserManager");
  const ousd = await OUSD.deploy();
  const userManager = await UserManager.deploy();

  const propertyManager = await PropertyManager.deploy(
    ousd.address,
    userManager.address
  );

  console.log("User manager deployed to", userManager.address);
  console.log("OUSD deployed to", ousd.address);
  console.log("Property manager deployed to", propertyManager.address);

  await ousd
    .connect(signer1)
    .transfer("0xCCaBbf41bc7121135673e683c3228A4DBA1FB6d8", "10000000");

  let prop;

  prop = await propertyManager.createNewProperty(
    "Dundalk House",
    "1000",
    [
      "https://unsplash.com/photos/Hh18POSx5qk/download?ixid=MnwxMjA3fDB8MXxzZWFyY2h8MTV8fGhvdXNlfGVufDB8fHx8MTY2OTkxNDExOA&force=true&w=500",
    ],
    "Dundalk, Maryland(MD), 21222"
  );

  await prop.wait();
  prop = await propertyManager.createNewProperty(
    "La Vila Es Beauty",
    "2000",
    [
      "https://unsplash.com/photos/U6Q6zVDgmSs/download?ixid=MnwxMjA3fDB8MXxzZWFyY2h8MTd8fGhvdXNlfGVufDB8fHx8MTY2OTkxNDExOA&force=true&w=500",
    ],
    "Pleasantville, Ohio(OH), 43148"
  );
  await prop.wait();
  prop = await propertyManager.createNewProperty(
    "House Of Cards",
    "3000",
    [
      "https://unsplash.com/photos/rChFUMwAe7E/download?ixid=MnwxMjA3fDB8MXxhbGx8fHx8fHx8fHwxNjY5OTMzMTUx&force=true&w=500",
    ],
    "Dixon, Missouri(MO), 65459"
  );
  await prop.wait();
  prop = await propertyManager.createNewProperty(
    "Porshe",
    "4000",
    [
      "https://unsplash.com/photos/yFV39g6AZ5o/download?ixid=MnwxMjA3fDB8MXxzZWFyY2h8MjJ8fGhvdXNlfGVufDB8fHx8MTY2OTkwODYyNA&force=true&w=500",
    ],
    "Vixon, Missouri(MO), 65459"
  );
  await prop.wait();
  prop = await propertyManager.createNewProperty(
    "Kamida",
    "100000",
    [
      "https://unsplash.com/photos/XGvwt544g8k/download?ixid=MnwxMjA3fDB8MXxzZWFyY2h8MjR8fGhvdXNlfGVufDB8fHx8MTY2OTkwODYyNA&force=true&w=500",
    ],
    "Nixon, Missouri(MO), 65459"
  );
  await prop.wait();
  prop = await propertyManager.createNewProperty(
    "Cest La Villa",
    "7000",
    [
      "https://unsplash.com/photos/ITzfgP77DTg/download?ixid=MnwxMjA3fDB8MXxzZWFyY2h8Mjd8fGhvdXNlfGVufDB8fHx8MTY2OTkwODYyNA&force=true&w=500",
    ],
    "Smyrna, Georgia(GA), 30080"
  );
  await prop.wait();
  prop = await propertyManager.createNewProperty(
    "Miamato De Carera",
    "89009",
    [
      "https://unsplash.com/photos/b_79nOqf95I/download?ixid=MnwxMjA3fDB8MXxzZWFyY2h8Mjh8fGhvdXNlfGVufDB8fHx8MTY2OTkwODYyNA&force=true&w=500",
    ],
    "74 Carriage CirOley, Pennsylvania(PA), 19547"
  );
  await prop.wait();
  prop = await propertyManager.createNewProperty(
    "Cissa A Missa",
    "67468",
    [
      "https://unsplash.com/photos/pmhdkgRCbtE/download?ixid=MnwxMjA3fDB8MXxzZWFyY2h8MzR8fGhvdXNlfGVufDB8fHx8MTY2OTkwODYyNA&force=true&w=500",
    ],
    "Naperville, Illinois(IL), 60563"
  );
  await prop.wait();
  prop = await propertyManager.createNewProperty(
    "Testiago La Carera",
    "12483",
    [
      "https://unsplash.com/photos/RCF5KSWb7Ms/download?ixid=MnwxMjA3fDB8MXxzZWFyY2h8Mzh8fGhvdXNlfGVufDB8fHx8MTY2OTkwODYyNA&force=true&w=500",
    ],
    "Theresa, New York(NY), 13691"
  );
  await prop.wait();
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
