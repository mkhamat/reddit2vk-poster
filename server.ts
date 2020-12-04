import dotenv from "dotenv"
import getPost from "./src/methods/getPost"
import uploadMedia from "./src/methods/uploadMedia"
import postToWall from "./src/methods/postToWall"
import removeTemp from "./src/utils/removeTemp"

dotenv.config()

async function main() {
  await getPost()
    .then((post: any) => {
      return uploadMedia(post)
    })
    .then((data: any) => {
      return postToWall(data)
    })
    .then((posted) => {
      if (posted) console.log("Succeffuly posted.")
      removeTemp()
    })
}

setInterval(async () => {
  await main()
}, 1000 * 30)
