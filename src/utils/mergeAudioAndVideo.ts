import ffmpeg from "ffmpeg"
/**
 * merges audio.mp4 and video.mp4 from temp folder
 * to single video
 */
export default async function merge() {
  console.log("Merging audio and video...")
  try {
    let video = await new ffmpeg("temp/video_part.mp4")
    ;(await video).addCommand("-i", "temp/audio_part.mp4")
    await video.save("temp/video.mp4")
  } catch (error) {
    console.error(error)
  }
}
