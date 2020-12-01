import formData from "form-data"
import { createReadStream } from "fs"
import { downloadFile } from "./tempPicDownload"

export default async function createForm(url: string) {
  await downloadFile(url, "temp.jpg")
  let form = new formData()
  form.append("photo", createReadStream("temp.jpg"), {
    filename: "temp.jpg",
    contentType: "multipart/form-data",
  })
  return form
}
