# hardhat-sandbox

This is the sandbox where the attack vector to solve the puzzle is implemented. The puzzle in matter is for the OpenZeppelin challenge at ETH Samba that is being hosted in Brazil.

The puzzle is a simple contract that leverages the compiler lack of input verification to modify the bits at low-level and mislead the validation in the contract to solve the puzzle.

## Setup

### Environment Variables

Start by copying the `.env.example` file to `.env` to use the RPC URL.

You must fill the corresponding values in the `.env` file.

### Install the files

```bash
npm install
yarn
```

### Deploy the contract

```bash
npx hardhat run scripts/deploy.ts --network sepolia
```

### Deploy the attack contract and solve the puzzle

```bash
npx hardhat run scripts/attack.ts --network sepolia
```

### You can also verify the contract

```bash
npx hardhat verify --network sepolia DEPLOYED_CONTRACT_ADDRESS
```
