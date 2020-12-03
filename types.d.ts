export type VkAttachments = {
  type: "photo" | "video" | "none"
  owner_id?: string
  id?: string
}

export type RedditVideo = {
  fallback_url: string
  is_gif: boolean
}

export type RedditPost = {
  is_video: boolean
  media: null | redditVideo
  post_hint: string
  url: string //image url if there's post hint
  title: string
  selftext: string
  subreddit: string
  author: string
  permalink: string
}
