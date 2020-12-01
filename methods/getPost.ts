import axios from "axios"
import dotenv from "dotenv"
import formData from "form-data"
dotenv.config()

let client_id: any = process.env.REDDIT_ID
let app_secret: any = process.env.REDDIT_SECRET
let username = process.env.REDDIT_USER
let password = process.env.REDDIT_PASSWORD

export default async function getPost() {
  let form = new formData()
  form.append("grant_type", "password")
  form.append("username", username)
  form.append("password", password)
  let token = await axios
    .post("https://www.reddit.com/api/v1/access_token", form, {
      headers: form.getHeaders(),
      auth: {
        username: client_id,
        password: app_secret,
      },
    })
    .then((res) => res.data.access_token)
  let result = await axios.get("https://oauth.reddit.com/top/?t=hour", {
    headers: { Authorization: `bearer ${token}` },
  })
  return result.data.data.children[0]
}