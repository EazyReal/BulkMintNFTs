import "fs"
import { readFileSync, writeFileSync } from "fs"

const ids = JSON.parse(
  readFileSync(`./data/ids.json`, { encoding: "utf8", flag: "r" })
)

let prizes = new Map<string, number>()

ids.forEach((i: number) => {
  const data = JSON.parse(
    readFileSync(`./data/meta/${i}`, { encoding: "utf8", flag: "r" })
  )
  data.attributes.forEach((prize: any) => {
    let cnt = prizes.get(prize.value) != undefined ? prizes.get(prize.value) : 0
    prizes.set(prize.value, (cnt as number) + 1) // cnt will always be a number
  })
})

writeFileSync(
  `./data/minted.json`,
  JSON.stringify(Array.from(prizes.entries()))
)

console.log(prizes)
