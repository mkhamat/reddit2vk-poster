import { createWriteStream } from "fs"
import axios from "axios"

export async function downloadFile(
  fileUrl: string,
  outputLocationPath: string
) {
  const writer = createWriteStream(outputLocationPath)

  return axios({
    method: "get",
    url: fileUrl,
    responseType: "stream",
  }).then((response) => {
    return new Promise((resolve, reject) => {
      response.data.pipe(writer)
      let error: Error | null = null
      writer.on("error", (err) => {
        error = err
        writer.close()
        reject(err)
      })
      writer.on("close", () => {
        if (!error) {
          resolve(true)
        }
      })
    })
  })
}
downloadFile(
  "https://v.redd.it/sb1ekgcyojx51/DASH_1080.mp4?source=fallback",
  "temp/video.mp4"
)
