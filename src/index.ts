import "dotenv/config.js";
import { DatabaseApi } from "./app/DatabaseApi.ts";
import { YoutubeApi } from './app/YoutubeApi.ts';
import { IVideoToBeStored } from "./interfaces/interfaces.ts";
import { generateVideoUrl } from "./utils/generateVideoUrl.ts";
import { getLatestVideo } from "./utils/getLatestVideo.ts";
import { getMinUploadDate } from './utils/minDateForUpload.ts';

async function main(){
  try {
    let latestVideo: IVideoToBeStored;
    if(process.env.ENABLE_CALLING_YOUTUBE_API === 'true'){
      const youtubeApi = new YoutubeApi()
      // TODO: make the channel name not be hardcoded, maybe a list of channels?
      const channelId = await youtubeApi.getChannelId('Hussein Nasser')
      const minDate = getMinUploadDate()
      const videosResponse = await youtubeApi.getVideos(channelId, minDate)
      latestVideo = getLatestVideo(videosResponse)
      latestVideo.videoUrl = generateVideoUrl(latestVideo.videoId)
    }
    
    if(process.env.ENABLE_CONNECTING_WITH_DB === 'true'){
      const databaseApi = new DatabaseApi()
      // TODO: Check if fetched videos are not inside database already
      await databaseApi.saveEntry(latestVideo)
      await databaseApi.closeConnection()
    }

  } catch (error) {
    console.log(error)
  }
  console.log('...Finnishing main...')
}

main()
