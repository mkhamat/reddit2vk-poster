import axios from "axios"
import dotenv from "dotenv"
import formData from "form-data"
dotenv.config()

let client_id: any = process.env.REDDIT_ID
let app_secret: any = process.env.REDDIT_SECRET
let username = process.env.REDDIT_USER
let password = process.env.REDDIT_PASSWORD

let form = new formData()
form.append("grant_type", "password")
form.append("username", username)
form.append("password", password)
/**
 * Fetch post from reddit
 */
export default async function getPost(url: string) {
  console.log("Fetching post from reddit...")
  let result = await axios.get(url).catch((error) => {
    console.error(error)
    return error
  })

  return result.data[0].data.children[0].data
}
