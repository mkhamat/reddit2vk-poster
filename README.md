# VK TO REDDIT POSTER

This thing is intendend to take `best|hot|popular|etc` posts from reddit and send them to vk group wall. (vk.com/reddtop)

It can handle various types of media (pictures, imgur attachments, external video, reddit hosted video, links, gifs)

Additionally it translates all text via reverso translator. (context.reverso.net)

## How to run

Clone this repo, run `yarn`, run `tsc` to compile, and run `src/server.js`. You'll need one dependency installed for proccessing video:

`sudo apt install ffmpeg`

And don't forget to create .env file in root directory with these values:

```
VK_TOKEN=
VK_GROUP_ID=
REDDIT_SECRET=
REDDIT_ID=
REDDIT_USER=
REDDIT_PASSWORD=
```
