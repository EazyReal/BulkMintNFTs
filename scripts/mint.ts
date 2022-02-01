import { ethers } from "hardhat"
import { config } from "dotenv"
import { MultiMint, ITarget } from "../typechain"
import { ContractFactory, ContractTransaction } from "ethers"
import IT from "../artifacts/contracts/MultiMint.sol/ITarget.json"
config()

async function main() {
  const pk = process.env.PRIVATE_KEY!
  const ma = process.env.MultiMint_ADDR!
  const ta = process.env.TARGET_ADDR!

  /// in production
  //const provider = ethers.getProvider("polygon")
  //const signer = new ethers.Wallet(pk, provider)

  //testing
  const signer = (await ethers.getSigners())[0]

  const sa = await signer.getAddress()
  const MM = await ethers.getContractFactory("MultiMint")
  const mm = new ethers.Contract(ma, MM.interface, signer) as MultiMint

  let promises: Promise<ContractTransaction>[] = []
  for (let i = 0; i < 10; i++) {
    promises.push(mm.bulkMint(ta, sa, 10))
  }
  const results = await Promise.allSettled(promises)
  const tt = new ethers.Contract(ta, IT.abi, signer) as ITarget
  console.log(`${sa} now has ${await tt.balanceOf(sa)} NFTs`)
}

// async main
main().catch((error) => {
  console.error(error)
  process.exitCode = 1
})
