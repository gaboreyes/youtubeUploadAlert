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

// TODO: Add a flow to make the bot work without a database connection
// TODO: Add a command for continuous listening on to channels, use with caution it may consume the whole api quota real fast
// TODO: Make the bot have some sort of session per GUILD ID, so that guild only fetches videos that it has added to the watch list
main()
