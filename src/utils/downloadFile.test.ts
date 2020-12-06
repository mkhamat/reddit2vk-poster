import { downloadFile } from "./downloadFile"
import removeTemp from "./removeTemp"
import fs from "fs"

test("Download file", () => {
  downloadFile(
    "https://v.redd.it/x2gooh5n93351/DASH_1080?source=fallback",
    "temp/test"
  )
    .then((res) => {
      expect(res).toBe(true)
      expect(fs.readdirSync("temp").indexOf("test")).toBeGreaterThanOrEqual(0)
    })
    .then(() => {
      removeTemp()
    })
})
