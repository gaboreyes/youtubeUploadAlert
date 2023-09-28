import { SlashCommandBuilder } from "discord.js";
import "dotenv/config.js";
import { DatabaseApi } from "../../app/DatabaseApi.ts";
import { YoutubeApi } from "../../app/YoutubeApi.ts";
import { IYoutubeChannel } from "../../interfaces/interfaces.ts";

const command = {
  data: new SlashCommandBuilder().setName('get-videos').setDescription('Returns the latest video for each watched channel'),
  async execute(interaction: any) {
    const hiddenResponse = process.env.EPHEMERAL_REPLY === 'true' ? true : false
    await interaction.reply({ content: 'Fetching videos...', ephemeral: hiddenResponse })

    const channelList: string[] = []
    const databaseApi = DatabaseApi.getInstance()

    if(process.env.ENABLE_CONNECTING_WITH_DB === 'true'){
      const watchedChannels: IYoutubeChannel[] = await databaseApi.getWatchedChannels()
      watchedChannels.forEach(channel => {
        channelList.push(channel.channelName)
      });
    } else {
      // TODO: Get the channels from a file?
      // TODO: Write watched channels to a file?
    }

    const youtubeApi = YoutubeApi.getInstance()
    const latestVideos = await youtubeApi.getLatestVideosFlow(channelList)
    for (let index = 0; index < latestVideos.length; index++) {
      await interaction.followUp({ content: latestVideos[index].videoUrl, ephemeral: hiddenResponse })
    }

    if(process.env.ENABLE_CONNECTING_WITH_DB === 'true') databaseApi.insertVideoFlow(latestVideos)
  }
}

export default command
