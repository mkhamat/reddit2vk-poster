type VkAttachments = {
  type: "photo" | "video" | "none"
  owner_id?: string
  id?: string
}

type RedditVideo = {
  fallback_url: string
  is_gif: boolean
}

type RedditPost = {
  is_video: boolean
  media: null | redditVideo
  post_hint: string
  url: string //image url if there's post hint
  title: string
  selftext: string
  subreddit: string
  author: string
  permalink: string
  url_overridden_by_dest: string
  crosspost_parent_list: RedditPost[]
}

type VkPostData = {
  message: string
  attachments: {
    type?: string
    owner_id?: string
    id?: string
  }
}

export { VkAttachments, RedditPost, RedditVideo, VkPostData }
