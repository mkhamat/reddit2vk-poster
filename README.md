# VK TO REDDIT POSTER

This thing is intendend to take `/random` posts from reddit and send them to [vk group](https://vk.com/randdit) wall.

It can handle various types of media (pictures, imgur attachments, external video, reddit hosted video, links, gifs and crossposts).

Additionaly, it translates all text via [reverso translator](https://context.reverso.net)

## How to run

- Clone this repo
- `$ yarn` to install dependencies
- `$ yarn build` to compile typescript
- `$ node dist/script.js` to start the script

You'll need one dependency installed for proccessing video:

`sudo apt install ffmpeg`

Also, create .env file in root directory with these values:

`VK_TOKEN=` \
`VK_GROUP_ID=`

### Links

[Getting VK Access Token](https://vk.com/dev/implicit_flow_user)

[Learning VK API](https://vk.com/dev/first_guide)
