/**
 * reddit hosted videos can be accesed via fallback_url
 * bit without audio. Audio can be accessed
 * if you change one piece in the url:
 * (.../DASH_1080.mp4...) -> (.../DASH_audio.mp4...)
 */
export default function modifyUrl(url: string) {
  let a: any = url.split("_")
  let b: any = a[1].split(".")
  b[0] = "audio"
  b = b.join(".")
  a[1] = b
  return a
}
