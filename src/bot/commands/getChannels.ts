import { SlashCommandBuilder } from "discord.js";
import { DatabaseApi } from "../../app/DatabaseApi.ts";
import { IYoutubeChannel } from "../../interfaces/interfaces.ts";

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const __rootDir = __dirname.substring(0,(__dirname.length - 17))

const command = {
  data: new SlashCommandBuilder().setName('get-channels').setDescription('Returns the channels that are being watched by the bot'),
  async execute(interaction: any) {
    const hiddenResponse = process.env.EPHEMERAL_REPLY === 'true' ? true : false
    
    let outputString: string = '';
    if(process.env.ENABLE_CONNECTING_WITH_DB === 'true'){
      const databaseApi = DatabaseApi.getInstance()
      const watchedChannels: IYoutubeChannel[] = await databaseApi.getWatchedChannels()
      watchedChannels.forEach(channel => {
        outputString += `${channel.channelName} - `
      });
      outputString = outputString.substring(0,outputString.length - 2)
    } else {
      try {
        let fileContent = fs.readFileSync(`${__rootDir}/watchedChannels.txt`, 'utf8')
        fileContent = fileContent.replace(/\n/g,' - ')
        outputString = fileContent
      } catch (error) {
        const errorMessage = 'Oops, something went wrong!'
        console.error(errorMessage)
        outputString = errorMessage
      }
    }
    await interaction.reply({ content: outputString, ephemeral: hiddenResponse })
  }
}

export default command
