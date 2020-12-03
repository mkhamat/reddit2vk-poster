import formData from "form-data"
import { createReadStream } from "fs"
import { downloadFile } from "./downloadFile"

export default async function createForm(url: string, type: "file" | "photo") {
  let ext: any = url.split(".")
  ext = ext[ext.length - 1]
  await downloadFile(url, `temp/temp.${ext}`)
  let form = new formData()
  form.append(type, createReadStream(`temp/temp.${ext}`), {
    filename: `temp/temp.${ext}`,
    contentType: "multipart/form-data",
  })
  return form
}
