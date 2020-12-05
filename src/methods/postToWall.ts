import axios from "axios"
import formData from "form-data"
import { VkAttachments } from "../../types"

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
  let form = await new formData()
  let attachment
  if (attachments.type !== "none") {
    let type = attachments.type
    let media_id = attachments.id
    let owner_id = attachments.owner_id
    attachment = `${type}${owner_id}_${media_id}`
    form.append("attachments", attachment)
  }
  form.append("message", message)
  form.append("owner_id", `-${process.env.VK_GROUP_ID}`)
  form.append("access_token", process.env.VK_TOKEN)
  form.append("v", "5.126")

  return axios
    .post(`https://api.vk.com/method/wall.post`, form, {
      headers: await form.getHeaders(),
    })
    .then((res) => {
      return res.data.response.post_id
    })
    .catch((err) => console.error(err))
}
