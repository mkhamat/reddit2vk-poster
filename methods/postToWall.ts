import axios from "axios"
import { VkAttachments } from "../types"
import formData from "form-data"

/**
 * Sends data to wall.post method
 *
 * @param message
 * @param attachments
 */
export default async function postToWall({
  message,
  attachments,
}: {
  message: string
  attachments: VkAttachments
}) {
  let attachment
  if (attachments.type !== "none") {
    let type = attachments.type
    let media_id = attachments.id
    let owner_id = attachments.owner_id
    attachment = `attachments=${type + owner_id}_${media_id}`
  }
  let form = await new formData()
  form.append("message", message)
  form.append("attachments", attachment || "")
  form.append("owner_id", "-200765302")
  form.append("access_token", process.env.VK_TOKEN)
  form.append("v", "5.126")

  return axios
    .post(`https://api.vk.com/method/wall.post`, form, {
      headers: await form.getHeaders(),
      maxContentLength: Infinity,
      maxBodyLength: Infinity,
    })
    .then((res) => {
      return res.data.response.post_id
    })
    .catch((err) => console.error(err))
}
