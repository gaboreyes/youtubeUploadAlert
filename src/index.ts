import { exit } from 'process'
import { YoutubeApi } from './app/YoutubeApi.ts'
import { checkHttpResponseError } from './utils/httpErrorCheck.ts'
import { getMinDateForUpload } from './utils/minDateForUpload.ts'

async function main(){
  try {
    const youtubeApi = new YoutubeApi()
    const channelIdResponse = await youtubeApi.getChannelId('Hussein Nasser')
    const httpRequestError = checkHttpResponseError(channelIdResponse)
    if(httpRequestError) exit(1)

    const {channelId} = channelIdResponse.items[0].snippet
    const minDate = getMinDateForUpload()
    const latestVideoResponse = await youtubeApi.getLatestVideo(channelId, minDate)
    
    latestVideoResponse.items.forEach((video: any) => {
      console.log(`${video.snippet.title} - ${video.id.videoId}`)
      console.log(video.snippet.publishedAt)
    });
    
  } catch (error) {
    console.log(error)
  }
}

main()
