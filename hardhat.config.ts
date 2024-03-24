import { HardhatUserConfig } from "hardhat/config";
import "@nomicfoundation/hardhat-toolbox";
import dotenv from "dotenv";
dotenv.config();

const config: HardhatUserConfig = {
  solidity: {
    compilers: [
      {
        version: "0.6.12",
        settings: {
          optimizer: {
            enabled: true,
            runs: 1000,
          },
        },
      },
    ],
  },
  networks: {
    hardhat: {
      chainId: 31337,
    },
    sepolia: {
      url: `${process.env.ALCHEMY_RPC_SEPOLIA}`,
      accounts: [`${process.env.ATTACKER_PRIVATE_KEY}`],
    },
  },
  defaultNetwork: "hardhat",
  etherscan: {
    apiKey: `${process.env.ETHERSCAN_API_KEY}`,
  },
  gasReporter: {
    enabled: true,
  },
  allowUnlimitedContractSize: true,
};

export default config;
