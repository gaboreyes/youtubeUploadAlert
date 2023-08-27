import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'url';
import { CustomDiscordClient } from '../app/CustomDiscordClient.ts';

async function addCommandsToClient(client: CustomDiscordClient){
  const __filename = fileURLToPath(import.meta.url);
  const __dirname = path.dirname(__filename);

  // Look for command files
  const commandsPath = path.join(__dirname, 'commands');
  const commandFiles = fs.readdirSync(commandsPath).filter(file => file.endsWith('.ts'));
  for (const file of commandFiles) {
    const filePath = path.join(commandsPath, file);
    // TODO: figure out if this split works in all OS
    const filePathElements = filePath.split('\\')
    const dynamicFilePath = `./${filePathElements[filePathElements.length - 2]}/${filePathElements[filePathElements.length - 1]}`
    
    // dinamically import each .ts file inside of ./commands dir
    const command = await import(dynamicFilePath);

    // Set a new item in the commands Collection with the key as the command name and the value as the exported module
    if (command.default.data && command.default.execute) {
      client.commands.set(command.default.data.name, command.default);
    } else {
      console.log(`[WARNING] The command at ${filePath} is missing a required "data" or "execute" property.`);
    }
  }
  return client
}

export { addCommandsToClient };

