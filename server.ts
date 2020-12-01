import uploadPost from "./methods/postToWall"
import dotenv from "dotenv"
import getPost from "./methods/getPost"

dotenv.config()

setInterval(() => {
  getPost()
    .then((post: any) => {
      uploadPost(post.data.url, post.data.title)
    })
    .catch((err) => {
      console.log(err)
    })
}, 1000 * 60 * 60)
