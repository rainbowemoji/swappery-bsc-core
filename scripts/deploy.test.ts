import { ethers } from "hardhat";

async function main() {
  const [deployer] = await ethers.getSigners();
  console.log("Deploying contracts with the account:", deployer.address);
  console.log("Account balance:", (await deployer.getBalance()).toString());

  const factory = await ethers.getContractFactory("SwapperyFactory");
  const swapperyFactory = await factory.deploy(
    "0x2C0b73164AF92a89d30Af163912B38F45b7f7b65"  // _feeToSetter
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
