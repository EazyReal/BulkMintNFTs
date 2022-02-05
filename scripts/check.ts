import "fs"
import { readFile, readFileSync, writeFileSync } from "fs"
import { int } from "hardhat/internal/core/params/argumentTypes"

async function main() {
  let meta = new Map<number, any>()
  for (const _i of Array(6666).keys()) {
    const i = _i + 1
    let data = JSON.parse(
      readFileSync(`meta/${i}`, { encoding: "utf8", flag: "r" })
    )
    data.attributes.forEach((trait: any) => {
      ;["iPad", "9284", "涵碧", "RAW"].forEach((reg) => {
        if (trait.value.search(reg) != -1) console.log(i, "has", trait.value)
      })
    })
    meta.set(i, data)
  }
  writeFileSync(`./data/all.json`, JSON.stringify(Array.from(meta.entries())))
}

main().catch((error) => {
  console.error(error)
  process.exitCode = 1
})
