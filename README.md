# Advanced Sample Hardhat Project

## How it works

- `MultiMint` contract creat `Minter`s who in constructor do
  - call `publicMint` and transfer the minted NFT to `to`

## Shorcuts

- `yarn hh` = `yarn hardhat`
- `yarn fork` = `yarn hardhat node`
- `yarn deploy` = `yarn run hardhat scripts/deploy.ts`
- `yarn mint` = `yarn run hardhat scripts/mint.ts`

## Usage

(before all operations, config `.env`)

- deploy with `scripts/deploy.ts`
  - `yarn deploy --network polygon`
- modify the `MULTIMINT_ADDR` env var
- mint with `scripts/mint.ts`
  - `yarn mint --network polygon`

## Simulating with Mainnet Fork

- `yarn fork` to fork mainnet to localhost
- turn on `--network localhost` for testing

## Unit Testing

- `yarn hh test`, you can also see the expected gas cost when testing
