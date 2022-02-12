import "fs"
import { readFileSync, writeFileSync } from "fs"

const ids = JSON.parse(
  readFileSync(`./data/ids`, { encoding: "utf8", flag: "r" })
)

ids.forEach((id: number) => {
  const data = JSON.parse(
    readFileSync(`./data/meta/${id}`, { encoding: "utf8", flag: "r" })
  )
  // console.log(data)
  data.attributes.forEach((prize: any) => {
    if (prize.value == "Demi 天絲抱枕") console.log(id)
  })
})
