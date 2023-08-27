import { IYoutubeVideoList, IYoutubeVideo, IVideoToBeStored } from "../interfaces/interfaces.ts";

function getLatestVideo(videoList: IYoutubeVideoList){
  let latestVideo: IVideoToBeStored = {
    videoId: null,
    videoTitle: null,
    videoUrl: null,
    channelId: null,
    channelTitle: null
  };
  const { items } = videoList
  
  items.every((video: IYoutubeVideo) => {
    if(video.id.videoId){
      latestVideo.videoId = video.id.videoId
      latestVideo.videoTitle = video.snippet.title
      latestVideo.channelTitle = video.snippet.channelTitle
      latestVideo.channelId = video.snippet.channelId
      return false
    }
    return true
  });
  return latestVideo
}

export { getLatestVideo }