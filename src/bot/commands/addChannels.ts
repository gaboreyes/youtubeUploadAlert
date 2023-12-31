import { SlashCommandBuilder } from "discord.js";
import "dotenv/config.js";
import { DatabaseApi } from "../../app/DatabaseApi.ts";

const command = {
  data: new SlashCommandBuilder().setName('add-channels')
  .setDescription('Adds the given channels to the watch list - I.E: FIRST CHANNEL, SECOND CHANNEL')
  .addStringOption(option => option.setName('channels').setDescription('A comma-separated list of youtube channels to watch')),

  async execute(interaction: any) {
    const hiddenResponse = process.env.EPHEMERAL_REPLY === 'true' ? true : false
    const channels = interaction.options.getString('channels')
    const channelsList = channels.split(', ')

    if(process.env.ENABLE_CONNECTING_WITH_DB === 'true'){
      const databaseApi = DatabaseApi.getInstance()
      const updateResult = await databaseApi.updateWatchedChannels(channelsList, 'add')
      if(!updateResult) console.log('Failed to add channels!')
    } else {
      console.log('Could not connect to database')
    }
    await interaction.reply({ content: `Channels added succesfully: ${channels}`, ephemeral: hiddenResponse })
  }
}

export default command
