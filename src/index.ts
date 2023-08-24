import { YoutubeApi } from './app/YoutubeApi.ts'

async function main(){
  const youtubeApi = new YoutubeApi()
  const channelIdResponse = await youtubeApi.getChannelId('Hussein Nasser')

  if(channelIdResponse.error){
    console.log(channelIdResponse.error.errors)
    return false
  }

  const {channelId} = channelIdResponse.items[0].snippet
  const latestVideoResponse = await youtubeApi.getLatestVideo(channelId)
  latestVideoResponse.items.forEach(video => {
    console.log(video)
  });
}

main()
