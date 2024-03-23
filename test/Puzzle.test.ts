import { SignerWithAddress } from "@nomiclabs/hardhat-ethers/signers";
import { expect } from "chai";
import { Contract } from "ethers";
import { ethers } from "hardhat";

describe("Puzzles for OZ", () => {
  // The deployer contract
  let HigherOrder: Contract;
  let HigherOrderAttack: Contract;

  // The signers of the test
  let deployer: SignerWithAddress;
  let exploiter: SignerWithAddress;

  before(async () => {
    [deployer, exploiter] = await ethers.getSigners();

    // Deploy the HigherOrder Puzzle
    let OrderFactory = await ethers.getContractFactory("HigherOrder", deployer);
    HigherOrder = await OrderFactory.deploy();

    // Deploy the HigherOrderAttack
    let OrderAttackFactory = await ethers.getContractFactory(
      "HigherOrderAttack",
      deployer,
    );
    HigherOrderAttack = await OrderAttackFactory.deploy();
  });

  it("Should solve the Higher Order Puzzle", async () => {
    let owner = await HigherOrder.commander();
    console.log("Current Commander: ", owner);
    let treasury = await HigherOrder.treasury();
    console.log("Injected Data: ", treasury);

    let tx = await HigherOrderAttack.connect(exploiter).attack(
      HigherOrder.address,
    );
    await tx.wait();

    tx = await HigherOrder.connect(exploiter).claimLeadership();
    await tx.wait();

    owner = await HigherOrder.commander();
    console.log("Current Commander: ", owner);
  });
});
