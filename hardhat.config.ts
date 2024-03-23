import { HardhatUserConfig } from "hardhat/config";
import "@nomicfoundation/hardhat-toolbox";
import dotenv from "dotenv";
dotenv.config();

const config: HardhatUserConfig = {
  solidity: {
    version: "0.8.20",
    settings: {
      optimizer: {
        enabled: true,
        runs: 200,
      },
    },
  },
  networks: {
    hardhat: {
      chainId: 31337,
    },
    sepolia: {
      url: `${process.env.ALCHEMY_RPC_SEPOLIA}`,
      accounts: [`${process.env.DEPLOYER_PRIVATE_KEY, process.env.EXPLOITER_PRIVATE_KEY}`],
    },
  },
  defaultNetwork: "hardhat",
  gasReporter: {
    enabled: true,
  },
  allowUnlimitedContractSize: true,
};

export default config;
