import { DatabaseApi } from "./app/DatabaseApi.ts";
import { YoutubeApi } from "./app/YoutubeApi.ts";

// Calling this function using 'npm run start' skips all discord bot interactions
async function main(){
  try {
    const youtubeApi = new YoutubeApi()
    const latestVideo = await youtubeApi.getLatestVideoFlow()
    const databaseApi = new DatabaseApi()
    databaseApi.insertVideoFlow(latestVideo)
  } catch (error) {
    console.log(error)
  }
  console.log('...Finnishing main...')
}
main()
