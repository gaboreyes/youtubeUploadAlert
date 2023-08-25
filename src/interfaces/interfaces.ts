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
  channelId: string;
  channelTitle: string;
}

export { IYoutubeVideoList, IYoutubeVideo, IVideoToBeStored } 