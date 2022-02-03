import { ethers } from "hardhat"
import { config } from "dotenv"
import { MultiMint, ITarget } from "../typechain"
import { ContractTransaction } from "ethers"
import IT from "../artifacts/contracts/MultiMint.sol/ITarget.json"
config()

async function main() {
  const ta = process.env.TARGET_ADDR!
  // this get the signer from hardhat.config.ts
  const signer = (await ethers.getSigners())[0]
  const tt = new ethers.Contract(ta, IT.abi, signer) as ITarget
  const n = await tt.balanceOf(signer.address)
  console.log(`${signer.address} now has ${n} NFTs`)
}

// async main
main().catch((error) => {
  console.error(error)
  process.exitCode = 1
})
