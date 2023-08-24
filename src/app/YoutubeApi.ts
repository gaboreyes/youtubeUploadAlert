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
    return await this.makeHttpRequest(url)
  }

  // Returns the latest video given a channel id
  public async getLatestVideo(channelId: string) {
    const url = `${this.baseUrl}&channelId=${channelId}&maxResults=3&key=${this.YOUTUBE_API_KEY}`
    return await this.makeHttpRequest(url)
  }

  private async makeHttpRequest(url: string) {
    const httpResponse = await fetch(url, {
      headers: { 'Content-Type': 'application/json' },
    })
    return await httpResponse.json();
  }
}

export { YoutubeApi };
