interface IYoutubeVideoList {
  readonly items: any[];
}

interface IYoutubeVideo {
  readonly id: {
    readonly videoId: string
  };
  readonly snippet: {
    readonly title: string,
    readonly channelTitle: string,
    readonly channelId: string,
  };
}

interface IVideoToBeStored {
  videoId: string;
  videoTitle: string;
  videoUrl: string;
  channelId: string;
  channelTitle: string;
}

interface IDiscordCommandObjectData {
  name: string;
  description: string;
  toJSON(): any;
}

export { IYoutubeVideoList, IYoutubeVideo, IVideoToBeStored, IDiscordCommandObjectData } 