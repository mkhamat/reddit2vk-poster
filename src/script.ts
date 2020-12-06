import dotenv from "dotenv"
import getPost from "./methods/getPost"
import uploadMedia from "./methods/uploadMedia"
import postToWall from "./methods/postToWall"
import removeTemp from "./utils/removeTemp"

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
    .catch((error) => console.error(error))
}

main()
