import { ethers } from "hardhat"
import { config } from "dotenv"
import { MultiMint, ITarget } from "../typechain"
import { ContractTransaction } from "ethers"
import IT from "../artifacts/contracts/MultiMint.sol/ITarget.json"
config()

async function main() {
  const ma = process.env.MULTIMINT_ADDR!
  const ta = process.env.TARGET_ADDR!
  // this get the signer from hardhat.config.ts
  const signer = (await ethers.getSigners())[0]

  const sa = await signer.getAddress()
  const MM = await ethers.getContractFactory("MultiMint")
  const mm = new ethers.Contract(ma, MM.interface, signer) as MultiMint

  let txs: Promise<ContractTransaction>[] = []
  for (let i = 0; i < 5; i++) {
    txs.push(mm.bulkMint(ta, sa, 10))
  }
  await Promise.allSettled(txs)
  const tt = new ethers.Contract(ta, IT.abi, signer) as ITarget
  const n = await tt.balanceOf(sa)
  console.log(`${sa} now has ${n} NFTs`)
}

// async main
main().catch((error) => {
  console.error(error)
  process.exitCode = 1
})
