import "dotenv/config.js";
import { YoutubeApi } from './app/YoutubeApi.ts';
import { DatabaseApi } from "./app/DatabaseApi.ts";
import { getMinUploadDate } from './utils/minDateForUpload.ts';

async function main(){
  try {
    let latestVideoResponse: any
    if(process.env.ENABLE_CALLING_YOUTUBE_API === 'true'){
      const youtubeApi = new YoutubeApi()
      const channelId = await youtubeApi.getChannelId('Hussein Nasser')
      const minDate = getMinUploadDate()
      latestVideoResponse = await youtubeApi.getLatestVideo(channelId, minDate)
    }

    if(process.env.ENABLE_CONNECTING_WITH_DB === 'true'){
      const databaseApi = new DatabaseApi()
      await databaseApi.saveEntry(latestVideoResponse)
      await databaseApi.closeConnection()
    }

  } catch (error) {
    console.log(error)
  }
  console.log('...Finnishing main...')
}

main()
