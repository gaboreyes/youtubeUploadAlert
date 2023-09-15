import { DatabaseApi } from "./app/DatabaseApi.ts";
import { YoutubeApi } from "./app/YoutubeApi.ts";

// Calling this function using 'npm run start' skips all discord bot interactions
async function main(){
  try {
    const channelList = ['Hussein Nasser', 'The PrimeTime', 'Pelado nerd', 'Fireship']
    const youtubeApi = YoutubeApi.getInstance()
    const latestVideos = await youtubeApi.getLatestVideosFlow(channelList)
    const databaseApi = new DatabaseApi()
    databaseApi.insertVideoFlow(latestVideos)
  } catch (error) {
    console.log(error)
  }
  console.log('...Finnishing main...')
}

// TODO: Why on saving videos to DB it shows 2 connections?
// TODO: Make the bot have some sort of session per GUILD ID, so that guild only fetches videos that it has added to the watch list
// TODO: Make the bot available to be invited to a channel?
// TODO: How does it picks the credentials for the guild?
// TODO: Make the bot listen for uploaded videos and trigger when a new one is detected?
main()
