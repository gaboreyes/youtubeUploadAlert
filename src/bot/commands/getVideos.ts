import { SlashCommandBuilder } from "discord.js";
import "dotenv/config.js";
import { DatabaseApi } from "../../app/DatabaseApi.ts";
import { YoutubeApi } from "../../app/YoutubeApi.ts";
import { IYoutubeChannel } from "../../interfaces/interfaces.ts";

const command = {
  data: new SlashCommandBuilder().setName('get-videos').setDescription('Returns the latest video url for the used channel'),
  async execute(interaction: any) {
    const hiddenResponse = process.env.EPHEMERAL_REPLY === 'true' ? true : false
    const channelList: string[] = []
    const databaseApi = DatabaseApi.getInstance()
    const watchedChannels: IYoutubeChannel[] = await databaseApi.getWatchedChannels()
    watchedChannels.forEach(channel => {
      channelList.push(channel.channelName)
    });

    const youtubeApi = YoutubeApi.getInstance()
    const latestVideos = await youtubeApi.getLatestVideosFlow(channelList)
    for (let index = 0; index < latestVideos.length; index++) {
      if(index === 0){
        await interaction.reply({ content: latestVideos[0].videoUrl, ephemeral: hiddenResponse })
      } else {
        await interaction.followUp({ content: latestVideos[index].videoUrl, ephemeral: hiddenResponse })
      }
    }
    databaseApi.insertVideoFlow(latestVideos)
  }
}

export default command
