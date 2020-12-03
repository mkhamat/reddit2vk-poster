import axios from "axios"
import { VkAttachments } from "../types"
import urlencode from "urlencode"

export default async function postToWall({
  title,
  message,
  attachments,
}: {
  title: string
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

  axios
    .get(
      `https://api.vk.com/method/wall.post?message=${urlencode(
        message ? title + "\n" + message : title
      )}&${attachment ? attachment : ""}&owner_id=-200765302&access_token=${
        process.env.VK_TOKEN
      }&v=5.126`
    )
    .then((res) => {
      console.log(res.data)
    })
}
