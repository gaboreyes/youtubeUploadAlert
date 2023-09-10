import { SlashCommandBuilder } from "discord.js";
import { DatabaseApi } from "../../app/DatabaseApi.ts";
import { YoutubeApi } from "../../app/YoutubeApi.ts";

const command = {
  data: new SlashCommandBuilder().setName('get-videos').setDescription('Returns the latest video url for the used channel'),
  async execute(interaction: any) {
    const channelList = ['Hussein Nasser', 'The PrimeTime', 'Pelado nerd', 'Fireship']
    const hiddenResponse = false
    const youtubeApi = new YoutubeApi()
    const latestVideos = await youtubeApi.getLatestVideosFlow(channelList)
    for (let index = 0; index < latestVideos.length; index++) {
      if(index === 0){
        await interaction.reply({ content: latestVideos[0].videoUrl || 'No video found', ephemeral: hiddenResponse })
      }else{
        await interaction.followUp({ content: latestVideos[index].videoUrl || 'No video found', ephemeral: hiddenResponse })
      }
    }
    const databaseApi = new DatabaseApi()
    databaseApi.insertVideoFlow(latestVideos)
  }
}

export default command
