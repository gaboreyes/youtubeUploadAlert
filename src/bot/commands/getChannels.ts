import { SlashCommandBuilder } from "discord.js";
import { DatabaseApi } from "../../app/DatabaseApi.ts";
import { IYoutubeChannel } from "../../interfaces/interfaces.ts";

const command = {
  data: new SlashCommandBuilder().setName('get-channels').setDescription('Returns the channels that are being watched by the bot'),
  async execute(interaction: any) {
    const hiddenResponse = false
    const databaseApi = DatabaseApi.getInstance()
    const watchedChannels: IYoutubeChannel[] = await databaseApi.getWatchedChannels()
    let outputString: string = '';
    watchedChannels.forEach(channel => {
      outputString += `${channel.channelName} - `
    });
    outputString = outputString.substring(0,outputString.length - 2)
    await interaction.reply({ content: outputString, ephemeral: hiddenResponse })
  }
}

export default command
