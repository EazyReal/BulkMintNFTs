# Advanced Sample Hardhat Project

## How it works

- `MultiMint` contract creat `Minter`s who in constructor do
  - call `publicMint` and transfer the minted NFT to `to`

## Shorcuts

- `yarn hh` = `yarn hardhat`
- `yarn fork` = `yarn hardhat node`
- `yarn deploy` = `yarn run hardhat scripts/deploy.ts`
- `yarn mint` = `yarn run hardhat scripts/mint.ts`

## Testing

- config `.env`
- `yarn fork` to fork mainnet to localhost

## Usage

- config `.env`
- deploy with `scripts/deploy.ts`
  - `yarn deploy --network polygon`
- mint with `scripts/mint.ts`
  - `yarn mint --network polygon`

## Default

This project demonstrates an advanced Hardhat use case, integrating other tools commonly used alongside Hardhat in the ecosystem.

The project comes with a sample contract, a test for that contract, a sample script that deploys that contract, and an example of a task implementation, which simply lists the available accounts. It also comes with a variety of other tools, preconfigured to work with the project code.

Try running some of the following tasks:

```shell
yarn run hardhat compile
yarn run hardhat clean
yarn run hardhat test
yarn run hardhat node
yarn run hardhat node --fork (with suitable config)
REPORT_GAS=true yarn run hardhat test
yarn run hardhat run scripts/deploy.ts
```

### Etherscan verification

To try out Etherscan verification, you first need to deploy a contract to an Ethereum network that's supported by Etherscan, such as Ropsten.

In this project, copy the .env.example file to a file named .env, and then edit it to fill in the details. Enter your Etherscan API key, your Ropsten node URL (eg from Alchemy), and the private key of the account which will send the deployment transaction. With a valid .env file in place, first deploy your contract:

```shell
hardhat run --network ropsten scripts/sample-script.ts
```

Then, copy the deployment address and paste it in to replace `DEPLOYED_CONTRACT_ADDRESS` in this command:

```shell
npx hardhat verify --network ropsten DEPLOYED_CONTRACT_ADDRESS "Hello, Hardhat!"
```

### Performance optimizations

For faster runs of your tests and scripts, consider skipping ts-node's type checking by setting the environment variable `TS_NODE_TRANSPILE_ONLY` to `1` in hardhat's environment. For more details see [the documentation](https://hardhat.org/guides/typescript.html#performance-optimizations).
