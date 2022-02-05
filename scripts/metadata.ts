import { ethers } from "hardhat"
import * as hre from "hardhat"
import * as dotenv from "dotenv"
import { ERC721, ERC721__factory } from "../typechain"
import { Contract, ContractReceipt, providers } from "ethers"
import { readFileSync, writeFileSync } from "fs"

import { Network } from "@ethersproject/networks"
import { assert } from "console"

const polygon: Network = {
  name: "polygon",
  chainId: 137,
  _defaultProvider: (providers) =>
    new providers.JsonRpcProvider("https://polygon-rpc.com/"),
}

const to = "all_meta.json"
const to2 = "my_meta.json"

// this is not useful since they are urls

async function main() {
  dotenv.config()
  const ta = process.env.TARGET_ADDR!
  const provider = ethers.getDefaultProvider(polygon)
  // assert(provider.network.chainId === 137, "not connected to polygon")
  const signer = (await ethers.getSigners())[0]
  const tt = new ethers.Contract(ta, ERC721__factory.abi, provider)
  const metadata = []
  writeFileSync(to, "")
  writeFileSync(to2, "")
  for (const _i of Array(100).keys()) {
    const i = _i + 1
    await tt.ownerOf(i)
    const data = await tt.tokenURI(i)
    metadata.push(data)
    writeFileSync(to, JSON.stringify(data), { flag: "a" })
    if ((await tt.ownerOf(i)) == signer.address) {
      writeFileSync(to2, JSON.stringify(data), { flag: "a" })
    }
  }
}

// async main
main().catch((error) => {
  console.error(error)
  process.exitCode = 1
})
