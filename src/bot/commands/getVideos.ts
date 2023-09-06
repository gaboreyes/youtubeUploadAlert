import { SlashCommandBuilder } from "discord.js";
import { DatabaseApi } from "../../app/DatabaseApi.ts";
import { YoutubeApi } from "../../app/YoutubeApi.ts";

const command = {
  data: new SlashCommandBuilder().setName('get-videos').setDescription('Returns the latest video url for the used channel'),
  async execute(interaction: any) {
    const youtubeApi = new YoutubeApi()
    const latestVideo = await youtubeApi.getLatestVideoFlow()
    await interaction.reply(latestVideo.videoUrl || 'No video found')
    const databaseApi = new DatabaseApi()
    databaseApi.insertVideoFlow(latestVideo)
  }
}

export default command
