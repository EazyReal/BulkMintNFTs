import { ethers } from "hardhat"

async function main() {
  const MultiMint = await ethers.getContractFactory("MultiMint")
  const mm = await MultiMint.deploy()
  await mm.deployed()
  console.log("MultiMint deployed to:", mm.address)
}

main().catch((error) => {
  console.error(error)
  process.exitCode = 1
})
