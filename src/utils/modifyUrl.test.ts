import modifyUrl from "./modifyUrl"

let table = [
  [
    "https://v.redd.it/m7us31mrnd361/DASH_720.mp4?source=fallback",
    "https://v.redd.it/m7us31mrnd361/DASH_audio.mp4?source=fallback",
  ],

  [
    "https://v.redd.it/bpkg4fue2d361/DASH_1080.mp4?source=fallback",
    "https://v.redd.it/bpkg4fue2d361/DASH_audio.mp4?source=fallback",
  ],

  [
    "https://v.redd.it/x2gooh5n93351/DASH_1080?source=fallback",
    "https://v.redd.it/x2gooh5n93351/audio?source=fallback",
  ],
]

describe.each(table)("Convert URL", (url, modified) => {
  test("url", () => {
    expect(modifyUrl(url)).toBe(modified)
  })
})
