import "dotenv/config.js";

class YoutubeApi{
  private baseUrl: string;
  private YOUTUBE_API_KEY: string;

  constructor() {
    this.YOUTUBE_API_KEY = process.env.YOUTUBE_API_KEY;
    this.baseUrl = 'https://youtube.googleapis.com/youtube/v3/search?&part=snippet'
  }

  // Returns a channel id given the channel name
  public async getChannelId(qParam: string) {
    const url = `${this.baseUrl}&maxResults=1&key=${this.YOUTUBE_API_KEY}&q=${qParam}`
    const channelIdResponse = await this.makeHttpRequest(url)
    if(channelIdResponse.error) throw new Error(channelIdResponse.error.errors[0].message);
    return channelIdResponse.items[0].snippet.channelId
  }

  // Returns a list of videos given a channel id
  public async getVideos(channelId: string, minDate: string) {
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
}

export { YoutubeApi };
