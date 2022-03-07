import { ethers } from "hardhat";

async function main() {
  const [deployer] = await ethers.getSigners();
  console.log("Deploying contracts with the account:", deployer.address);
  console.log("Account balance:", (await deployer.getBalance()).toString());

  const factory = await ethers.getContractFactory("SwapperyFactory");
  const swapperyFactory = await factory.deploy(
    "0x3ED3E34bA3aC2079CE434D7D03D2BfDC048dec32"
  );

  await swapperyFactory.deployed();

  console.log("swapperyFactory deployed to:", swapperyFactory.address);
}
main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exitCode = 1;
  });
