import { YoutubeApi } from './app/YoutubeApi.ts'
import { getMinUploadDate } from './utils/minDateForUpload.ts'

async function main(){
  try {
    const youtubeApi = new YoutubeApi()
    const channelId = await youtubeApi.getChannelId('Hussein Nasser')
    const minDate = getMinUploadDate()
    const latestVideoResponse = await youtubeApi.getLatestVideo(channelId, minDate)
    console.log(latestVideoResponse)
    // TODO: Save this result to MongoDB
  } catch (error) {
    console.log(error)
  }
  console.log('...Finnishing main...')
}

main()
