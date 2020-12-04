import formData from "form-data"
import { createReadStream } from "fs"
import { downloadFile } from "./downloadFile"
import merge from "./mergeAudioAndVideo"
import modifyUrl from "./modifyUrl"

/**
 * Creates form with desired file from url in the multipart/form-data format
 *
 * @param url
 * @param type
 *
 */
export default async function createForm(
  url: string,
  type: "file" | "photo" | "video_file"
) {
  console.log("Creating POST data...")
  try {
    let ext: any = url.split(".")
    ext = ext[ext.length - 1]
    if (type === "video_file") {
      await downloadFile(url, "../temp/video_part.mp4")
      await downloadFile(modifyUrl(url), "../temp/audio_part.mp4")
      await merge()
    } else {
      await downloadFile(url, `../temp/temp.${ext}`)
    }
    let form = new formData()
    form.append(
      type,
      createReadStream(
        type === "video_file" ? "../temp/video.mp4" : `../temp/temp.${ext}`
      ),
      {
        filename: `../temp/temp.${ext}`,
        contentType: "multipart/form-data",
      }
    )
    return form
  } catch (error) {
    console.error(error)
  }
}
