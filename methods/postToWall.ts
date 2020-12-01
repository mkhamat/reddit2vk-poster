import axios from "axios"
import createForm from "../utils/formData"
import { clear } from "../utils/tempPicDownload"

export default async function uploadPost(url: string, caption: string) {
  axios
    .get(
      `https://api.vk.com/method/photos.getWallUploadServer?group_id=200765302&access_token=${process.env.VK_TOKEN}&v=5.126`
    )
    .then(async (res) => {
      let uploadUrl = res.data.response.upload_url
      let form = await createForm(url) //create form with picture from url
      axios
        .post(uploadUrl, form, {
          headers: form.getHeaders(),
        })
        .then((res) => {
          axios
            .get(
              `https://api.vk.com/method/photos.saveWallPhoto?group_id=200765302&server=${res.data.server}&photo=${res.data.photo}&hash=${res.data.hash}&caption=${caption}&access_token=${process.env.VK_TOKEN}&v=5.126`
            )
            .then((res) => {
              let response = res.data.response[0]
              axios
                .get(
                  `https://api.vk.com/method/wall.post?attachments=photo${response.owner_id}_${response.id}&owner_id=-200765302&access_token=${process.env.VK_TOKEN}&v=5.126`
                )
                .then((res) => {
                  clear()
                  console.log(res)
                })
            })
        })
    })
}
