import fs from "fs"

export default async function removeTemp() {
  let temp = fs.readdirSync("temp")
  for (let file of temp) {
    fs.unlinkSync(`temp/${file}`)
  }
}
