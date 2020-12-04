import fs from "fs"
export default async function removeTemp() {
  console.log("Cleaning up \n ___________")

  let temp = fs.readdirSync("../../temp")
  for (let file of temp) {
    fs.unlinkSync(`../../temp/${file}`)
  }
}
