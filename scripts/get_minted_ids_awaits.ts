import "fs"
import { readFileSync, writeFileSync } from "fs"
import { ERC721, ERC721__factory } from "../typechain"
import { ethers } from "ethers"
import * as dotenv from "dotenv"
import { time } from "console"

async function main() {
  dotenv.config()
  const provider = new ethers.providers.JsonRpcProvider(
    "https://polygon-rpc.com/"
    //process.env.ALCHEMY_API!
  )
  const signer = new ethers.Wallet(process.env.PRIVATE_KEY!, provider)
  const nft = new ethers.Contract(
    process.env.TARGET_ADDR!,
    ERC721__factory.abi,
    signer
  ) as ERC721
  const offset = 4990 // ranged in 4993->5488
  let calls: Promise<string>[] = []
  let ids: number[] = []
  for (const _i of Array(500).keys()) {
    const i = _i + offset
    if ((await nft.ownerOf(i)) === signer.address) {
      ids.push(i)
    }
  }
  writeFileSync(`./data/ids.json`, JSON.stringify(ids))
}

main().catch((error) => {
  console.error(error)
  process.exitCode = 1
})
