import ffmpeg from "ffmpeg"
export default async function merge() {
  let video = await new ffmpeg("temp/video_part.mp4")
  ;(await video).addCommand("-i", "temp/audio_part.mp4")
  await video.save("temp/video.mp4")
}
