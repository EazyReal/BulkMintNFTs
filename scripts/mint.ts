import { ethers } from "hardhat"
import * as dotenv from "dotenv"
import { MultiMint, ITarget } from "../typechain"
import { ContractTransaction } from "ethers"
import IT from "../artifacts/contracts/MultiMint.sol/ITarget.json"

async function main() {
  // config was outside the block
  // maybe the env bug is because of config was not executed and main is called....
  dotenv.config()
  const ma = process.env.MULTIMINT_ADDR!
  const ta = process.env.TARGET_ADDR!
  // this get the signer from hardhat.config.ts
  const signer = (await ethers.getSigners())[0]

  const MM = await ethers.getContractFactory("MultiMint")
  const mm = new ethers.Contract(ma, MM.interface, signer) as MultiMint
  const sa = await signer.getAddress()

  console.log(`multimint address is ${ma}`)
  console.log(`target is ${ta}`)
  console.log(`signer is ${sa}`)

  let txs: Promise<ContractTransaction>[] = []
  for (let i = 0; i < 5; i++) {
    console.log(`pushing tx ${i}`)
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
