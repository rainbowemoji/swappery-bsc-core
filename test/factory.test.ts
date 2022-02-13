import { SignerWithAddress } from "@nomiclabs/hardhat-ethers/signers";
import { expect } from "chai";
import { ethers } from "hardhat";
import { PancakeFactory, PancakePair } from "../typechain";

// Defaults to e18 using amount * 10^18
function getBigNumber(amount: number, decimals = 18) {
  return ethers.BigNumber.from(amount).mul(
    ethers.BigNumber.from(10).pow(decimals)
  );
}
const TEST_ADDRESSES: [string, string] = [
  "0x1000000000000000000000000000000000000000",
  "0x2000000000000000000000000000000000000000",
];
describe("Factory", function () {
  let admin: SignerWithAddress;
  let addrs: SignerWithAddress[];

  let pair: PancakePair;
  let factory: PancakeFactory;
  before(async () => {
    [admin, ...addrs] = await ethers.getSigners();
    let temp = await ethers.getContractFactory("PancakeFactory");
    factory = await temp.deploy("0x2000000000000000000000000000000000000000");
  });
  it("feeTo, feeToSetter, allPairsLength", async () => {
    expect(await factory.feeTo()).to.eq(ethers.constants.AddressZero);
    expect(await factory.feeToSetter()).to.eq(
      "0x2000000000000000000000000000000000000000"
    );
    expect(await factory.allPairsLength()).to.eq(0);
  });
  it("createPair", async () => {
    let tx = await factory.createPair(TEST_ADDRESSES[0], TEST_ADDRESSES[1]);
    let receipt = await tx.wait();
    console.log(receipt.gasUsed);
  });
});
