import { SlashCommandBuilder } from "discord.js";
import "dotenv/config.js";
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { DatabaseApi } from "../../app/DatabaseApi.ts";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const __rootDir = __dirname.substring(0,(__dirname.length - 17))
const COMMAN_DESCRIPTION = 'A comma-separated list of youtube channels to watch - I.E: FIRST CHANNEL, SECOND CHANNEL'

const command = {
  data: new SlashCommandBuilder().setName('add-channels')
  .setDescription(COMMAN_DESCRIPTION)
  .addStringOption(option => option.setName('channels').setDescription(COMMAN_DESCRIPTION)),

  async execute(interaction: any) {
    const hiddenResponse = process.env.EPHEMERAL_REPLY === 'true' ? true : false
    const channels = interaction.options.getString('channels')
    const channelsList = channels.split(', ')

    if(process.env.ENABLE_CONNECTING_WITH_DB === 'true'){
      const databaseApi = DatabaseApi.getInstance()
      const updateResult = await databaseApi.updateWatchedChannels(channelsList, 'add')
      if(!updateResult) console.log('Failed to add channels!')
    } else {
      let data = ''
      channelsList.forEach((channel: string) => {
        if(data === ''){
          data = channel
        } else {
          data = `${data}\n${channel}` 
        }
      });
      fs.writeFile(`${__rootDir}/watchedChannels.txt`, data, err => {
        if (err) console.error(err);
      });
    }
    await interaction.reply({ content: `Channels added succesfully: ${channels}`, ephemeral: hiddenResponse })
  }
}

export default command
