import { SlashCommandBuilder } from "discord.js";
import { YoutubeApi } from "../../app/YoutubeApi.ts";
import { IVideoToBeStored } from "../../interfaces/interfaces.ts";
import { generateVideoUrl } from "../../utils/generateVideoUrl.ts";
import { getLatestVideo } from "../../utils/getLatestVideo.ts";
import { getMinUploadDate } from "../../utils/minDateForUpload.ts";
import { DatabaseApi } from "../../app/DatabaseApi.ts";

const command = {
  data: new SlashCommandBuilder().setName('get-videos').setDescription('Returns the latest video url for the used channel'),
  async execute(interaction: any) {
    let latestVideo: IVideoToBeStored;

    if(process.env.ENABLE_CALLING_YOUTUBE_API === 'true'){
      const youtubeApi = new YoutubeApi()
      // TODO: make the channel name not be hardcoded, maybe a list of channels?
      const channelId = await youtubeApi.getChannelId('Hussein Nasser')
      const minDate = getMinUploadDate()
      const videosResponse = await youtubeApi.getVideos(channelId, minDate)
      latestVideo = getLatestVideo(videosResponse)
      latestVideo.videoUrl = generateVideoUrl(latestVideo.videoId)
    }

    await interaction.reply(latestVideo.videoUrl || 'No video found')

    if(process.env.ENABLE_CONNECTING_WITH_DB === 'true' && latestVideo.videoUrl){
      const databaseApi = new DatabaseApi()
      const connection = await databaseApi.stablishConnection()
      const exists = await databaseApi.findEntry(latestVideo.videoId)
      if(!exists) await databaseApi.saveEntry(latestVideo)
      databaseApi.closeConnection()
    }
  }
}

export default command
