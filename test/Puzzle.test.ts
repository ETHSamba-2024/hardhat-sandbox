import { SignerWithAddress } from "@nomiclabs/hardhat-ethers/signers";
import { Contract } from "ethers";
import { ethers } from "hardhat";

describe("Puzzle OZ", () => {

    // The deployer contract
    let Puzzle: Contract;

    // The signers of the test
    let deployer: SignerWithAddress;

    before(async () => {
        [deployer] = await ethers.getSigners();
        const Factory = await ethers.getContractFactory("Puzzle", deployer);
        Puzzle = await Factory.deploy();
      });

  it("should solve the puzzzle", async () => {

  });
});
