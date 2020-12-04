import { createWriteStream } from "fs"
import axios from "axios"

/**
 * Downloads file by URL.
 * @param fileUrl
 * @param outputLocationPath
 *
 */
export async function downloadFile(
  fileUrl: string,
  outputLocationPath: string
) {
  console.log("Downloading file...")

  const writer = createWriteStream(outputLocationPath)

  return axios({
    method: "get",
    url: fileUrl,
    responseType: "stream",
  })
    .then((response) => {
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
    .catch((err) => console.error(err))
}
