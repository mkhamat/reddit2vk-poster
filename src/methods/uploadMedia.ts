import axios from "axios"
import { RedditPost } from "../../types"
import createForm from "../utils/createForm"
import translate from "../utils/reverso"

/**
 * Handling media in post and uploading if there's any.
 *
 * @param post
 */
export default async function uploadMedia(post: RedditPost) {
  console.log("Handling media...")

  post.title = await translate(post.title)
  post.selftext = await translate(post.selftext)
  let type
  let id
  let owner_id
  let message =
    `r/${post.subreddit}` +
    "\n \n" +
    post.title +
    "\n \n" +
    post.selftext +
    "\n \n" +
    `Источник: reddit.com${post.permalink}`
  if (post.post_hint) {
    if (post.post_hint === "image") {
      let uploaded: any
      if (post.url.split(".").reverse()[0] === "gif") {
        uploaded = await uploadGif(post.url)
        type = "doc"
        id = uploaded.id
        owner_id = uploaded.owner_id
      } else {
        uploaded = await uploadPicture(post.url)
        type = "photo"
        id = uploaded.id
        owner_id = uploaded.owner_id
      }
    } else if (post.post_hint === "hosted:video") {
      let uploaded = await uploadVideoFromReddit(
        post.media.reddit_video.fallback_url
      )
      type = "video"
      id = uploaded.video_id
      owner_id = uploaded.owner_id
    } else if (post.post_hint === "rich:video") {
      let uploaded = await addExternalVideo(post.media.oembed.url)
      type = "video"
      id = uploaded.video_id
      owner_id = uploaded.owner_id
    }

    return {
      message: message,
      attachments: {
        type: type,
        owner_id: owner_id,
        id: id,
      },
    }
  } else {
    return {
      message: message,
      attachments: {
        type: "none",
      },
    }
  }
}

async function uploadPicture(url: string) {
  let form = await createForm(url, "photo") //create form with picture from url
  return await axios
    .get(
      `https://api.vk.com/method/photos.getWallUploadServer?group_id=200765302&access_token=${process.env.VK_TOKEN}&v=5.126`
    )
    .then((res) => {
      let uploadUrl = res.data.response.upload_url
      return axios.post(uploadUrl, form, {
        headers: form?.getHeaders(),
        maxBodyLength: Infinity,
      })
    })
    .then((res: any) => {
      return axios.get(
        `https://api.vk.com/method/photos.saveWallPhoto?group_id=200765302&&server=${res.data.server}&photo=${res.data.photo}&hash=${res.data.hash}&access_token=${process.env.VK_TOKEN}&v=5.126`
      )
    })
    .then((res: any) => {
      return res.data.response[0]
    })
}

async function uploadGif(url: string) {
  let form = await createForm(url, "file") //create form with gif from url
  return await axios
    .get(
      `https://api.vk.com/method/docs.getWallUploadServer?group_id=200765302&access_token=${process.env.VK_TOKEN}&v=5.126`
    )
    .then((res) => {
      let uploadUrl = res.data.response.upload_url
      return axios.post(uploadUrl, form, {
        headers: form?.getHeaders(),
        maxBodyLength: Infinity,
      })
    })
    .then((res: any) => {
      return axios.get(
        `https://api.vk.com/method/docs.save?file=${res.data.file}&access_token=${process.env.VK_TOKEN}&v=5.126`
      )
    })
    .then((res: any) => {
      return res.data.response.doc
    })
}

async function addExternalVideo(url: string) {
  return await axios
    .get(
      `https://api.vk.com/method/video.save?link=${url}&wallpost=1&group_id=200765302&access_token=${process.env.VK_TOKEN}&v=5.126`
    )
    .then(async (res) => {
      await axios.get(res.data.response.upload_url)
      return res.data.response
    })
}

async function uploadVideoFromReddit(url: string) {
  let data = { owner_id: "", video_id: "" }
  let form = await createForm(url, "video_file")
  return await axios
    .get(
      `https://api.vk.com/method/video.save?&wallpost=1&group_id=200765302&access_token=${process.env.VK_TOKEN}&v=5.126`
    )
    .then(async (res) => {
      data.owner_id = res.data.response.owner_id
      let uploadUrl = res.data.response.upload_url
      return await axios.post(uploadUrl, form, {
        headers: form?.getHeaders(),
        maxBodyLength: Infinity,
      })
    })
    .then((res: any) => {
      data.video_id = res.data.video_id
      return data
    })
}
