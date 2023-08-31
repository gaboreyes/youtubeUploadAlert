import "dotenv/config.js";
import { DateTime } from 'luxon';
import { IVideoToBeStored, IYoutubeVideo, IYoutubeVideoList } from "../interfaces/interfaces.ts";

class YoutubeApi{
  private baseUrl: string;
  private YOUTUBE_API_KEY: string;

  constructor() {
    this.YOUTUBE_API_KEY = process.env.YOUTUBE_API_KEY;
    this.baseUrl = 'https://youtube.googleapis.com/youtube/v3/search?&part=snippet'
  }

  public async getChannelIdGivenChannelName(qParam: string) {
    const url = `${this.baseUrl}&maxResults=1&key=${this.YOUTUBE_API_KEY}&q=${qParam}`
    const channelIdResponse = await this.makeHttpRequest(url)
    if(channelIdResponse.error) throw new Error(channelIdResponse.error.errors[0].message);
    return channelIdResponse.items[0].snippet.channelId
  }

  public async getVideosGivenChannelId(channelId: string, minDate: string) {
    const url = `${this.baseUrl}&channelId=${channelId}&maxResults=5&order=date&publishedAfter=${minDate}&key=${this.YOUTUBE_API_KEY}`
    const getVideosResponse = await this.makeHttpRequest(url)
    if(getVideosResponse.error) throw new Error(getVideosResponse.error.errors[0].message);
    return getVideosResponse
  }

  private async makeHttpRequest(url: string) {
    const httpResponse = await fetch(url, {
      headers: { 'Content-Type': 'application/json' },
    })
    return await httpResponse.json();
  }

  private getLatestVideoFromVideoArray(videoList: IYoutubeVideoList) {
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

  public generateVideoUrl(videoId: string) {
    return `https://www.youtube.com/watch?v=${videoId}`
  }

  private getMinUploadDate(){
    let todaysDate = DateTime.utc()
    let minDate = todaysDate.minus({ days: 14 });
    const month = minDate.month.toString().length > 1 ? minDate.month : `0${minDate.month}`
    const day = minDate.day.toString().length > 1 ? minDate.day : `0${minDate.day}`
    const hour = minDate.hour.toString().length > 1 ? minDate.hour : `0${minDate.hour}`
    const minutes = minDate.minute.toString().length > 1 ? minDate.minute : `0${minDate.minute}`
    const seconds = minDate.second.toString().length > 1 ? minDate.second : `0${minDate.second}`
    return `${minDate.year}-${month}-${day}T${hour}%3A${minutes}%3A${seconds}Z`
  }

  public async getLatestVideoFlow() {
    let latestVideo: IVideoToBeStored;
    if(process.env.ENABLE_CALLING_YOUTUBE_API === 'true'){
      // TODO: make the channel name not be hardcoded, maybe a list of channels?
      const channelId = await this.getChannelIdGivenChannelName('Hussein Nasser')
      const minDate = this.getMinUploadDate()
      const videosResponse = await this.getVideosGivenChannelId(channelId, minDate)
      latestVideo = this.getLatestVideoFromVideoArray(videosResponse)
      latestVideo.videoUrl = this.generateVideoUrl(latestVideo.videoId)
    }
    return latestVideo
  }
}

export { YoutubeApi };
