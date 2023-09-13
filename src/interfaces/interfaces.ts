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

interface IYoutubeChannel {
  readonly channelName: String,
  readonly beingWatched: Boolean,
}

interface IDiscordCommandObjectEndpoint {
  id: string,
  application_id: string,
  version: string,
  default_member_permissions?: any,
  type: number,
  name: string,
  name_localizations?: any,
  description: string,
  description_localizations?: any,
  guild_id: string,
  nsfw: boolean
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

export { 
  IYoutubeVideoList, 
  IYoutubeVideo,
  IVideoToBeStored,
  IDiscordCommandObjectData,
  IDiscordCommandObjectEndpoint,
  IYoutubeChannel 
} 