import "dotenv/config.js";
import { YoutubeApi } from './app/YoutubeApi.ts'
import { connectToMongoDb } from './utils/mongoDb.ts'
import { getMinUploadDate } from './utils/minDateForUpload.ts'

async function main(){
  try {
    await connectToMongoDb(process.env.DATABASE_USER, process.env.DATABASE_PASSWORD, process.env.DATABASE_NAME)
    if(process.env.ENABLE_CALLING_YOUTUBE_API === 'true'){
      const youtubeApi = new YoutubeApi()
      const channelId = await youtubeApi.getChannelId('Hussein Nasser')
      const minDate = getMinUploadDate()
      const latestVideoResponse = await youtubeApi.getLatestVideo(channelId, minDate)
      console.log(latestVideoResponse)
    }
    // TODO: Save this result to MongoDB
  } catch (error) {
    console.log(error)
  }
  console.log('...Finnishing main...')
}

main()
