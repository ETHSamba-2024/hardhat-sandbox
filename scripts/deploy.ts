import { ethers } from "hardhat";

async function main() {
  const [attacker] = await ethers.getSigners();
  console.log("Deployer address:", attacker.address);

  const HigherOrderFactory = await ethers.getContractFactory("HigherOrder");
  const HigherOrder = await HigherOrderFactory.deploy();
  await HigherOrder.deployed();

  console.log("HigherOrder deployed to:", HigherOrder.address);
}

main();
