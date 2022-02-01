import { expect, assert } from "chai"
import { Contract, ContractFactory, Signer } from "ethers"
import { ethers } from "hardhat"
import {
  ITarget,
  ITarget__factory,
  MultiMint,
  MultiMint__factory,
} from "../typechain"
import IT from "../artifacts/contracts/MultiMint.sol/ITarget.json"
import * as dotenv from "dotenv"

dotenv.config()

describe("MultiMint", function () {
  let mm: MultiMint
  //let addr = process.env.MultiMint_ADDR!
  let ta = process.env.TARGET_ADDR!
  let signer: Signer
  let sa: string
  let MM: MultiMint__factory
  let TT: ITarget__factory
  let target: ITarget
  before(async () => {
    MM = await ethers.getContractFactory("MultiMint")
    //TT = await ethers.getContractFactory("ITarget")
    let signers = await ethers.getSigners()
    signer = signers[0]
    sa = await signer.getAddress()
    mm = await MM.deploy()
    await mm.deployed()
    console.log("MultiMint deployed to:", mm.address)
    target = new ethers.Contract(ta, IT.abi, signer) as ITarget
  })

  it("should bulkMint tokens to signer account", async function () {
    await mm.bulkMint(ta, sa, 10)
    await mm.bulkMint(ta, sa, 10)
    expect(await target.balanceOf(sa)).to.equal(ethers.BigNumber.from(71))
  })
})
