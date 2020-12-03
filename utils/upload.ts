import axios from "axios"
import { RedditPost, VkAttachments } from "../types"
import { downloadFile } from "./downloadFile"
import createForm from "./formData"
import modifyUrl from "./modifyUrl"

export default async function upload(post: RedditPost) {
  if (post.post_hint) {
    if (post.post_hint === "image") {
      let uploaded: any
      if (post.url.split(".").reverse()[0] === "gif") {
        uploaded = await uploadGif(post.url)
        return {
          title: post.title,
          message: post.selftext,
          attachments: {
            type: "doc",
            owner_id: uploaded.owner_id,
            id: uploaded.id,
          },
        }
      } else {
        uploaded = await uploadPicture(post.url)
        return {
          title: post.title,
          message: post.selftext,
          attachments: {
            type: "photo",
            owner_id: uploaded.owner_id,
            id: uploaded.id,
          },
        }
      }
    } else if (post.post_hint === "hosted:video") {
      console.log(post)

      let uploaded = await uploadVideoFromReddit(
        post.media.reddit_video.fallback_url
      )
      return {
        title: post.title,
        message: post.selftext,
        attachments: {
          type: "video",
          // owner_id: uploaded.owner_id,
          // id: uploaded.video_id,
        },
      }
    } else if (post.post_hint === "rich:video") {
      let uploaded = await addExternalVideo(post.media.oembed.url)
      return {
        title: post.title,
        message: post.selftext,
        attachments: {
          type: "video",
          owner_id: uploaded.owner_id,
          id: uploaded.video_id,
        },
      }
    }
  } else {
    console.log("no attachment")
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
        headers: form.getHeaders(),
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
        headers: form.getHeaders(),
        maxBodyLength: Infinity,
      })
    })
    .then((res: any) => {
      return axios.get(
        `https://api.vk.com/method/docs.save?file=${res.data.file}&access_token=${process.env.VK_TOKEN}&v=5.126`
      )
    })
    .then((res: any) => {
      console.log(res.data.response.doc)

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
  let audioUrl = modifyUrl(url)
  await downloadFile(url, "temp/video.mp4")
  await downloadFile(audioUrl, "temp/audio.mp4")

  // return await axios
  //   .get(
  //     `https://api.vk.com/method/video.save?link=${url}&wallpost=1&group_id=200765302&access_token=${process.env.VK_TOKEN}&v=5.126`
  //   )
  //   .then(async (res) => {
  //     await axios.get(res.data.response.upload_url)
  //     return res.data.response

  //     let uploadUrl = res.data.response.upload_url
  // return axios.post(uploadUrl, form, {
  //   headers: form.getHeaders(),
  //   maxBodyLength: Infinity,
  // })
  // })
  // .then((res: any) => {
  //   return axios.get(
  //     `https://api.vk.com/method/docs.save?file=${res.data.file}&access_token=${process.env.VK_TOKEN}&v=5.126`
  //   )
  // })
  // .then((res: any) => {
  //   console.log(res.data.response.doc)

  //   return res.data.response.doc
  // })
}
