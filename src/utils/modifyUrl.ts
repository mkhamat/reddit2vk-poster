/**
 *
 * reddit hosted videos can be accesed via fallback_url
 * bit without audio. Audio can be accessed
 * if you change one piece in the url:
 * (.../DASH_1080.mp4...) -> (.../DASH_audio.mp4...)
 * @param url
 */
export default function modifyUrl(url: string) {
  let ext = url.indexOf(".mp4") > 0
  let s = ext ? "." : "?"
  let s2 = ext ? "_" : "DASH_"
  let a: any = url.split(s2)
  let b: any = a[1].split(s)
  b[0] = "audio"
  b = b.join(s)
  a[1] = b
  return a.join(ext ? "_" : "")
}
