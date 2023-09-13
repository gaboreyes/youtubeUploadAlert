import { REST, Routes } from 'discord.js';
import "dotenv/config.js";
import { IDiscordCommandObjectData, IDiscordCommandObjectEndpoint } from '../interfaces/interfaces.ts';
 
async function deployCommands(clientCommands: Map< string, { data: IDiscordCommandObjectData, execute:() => void } >) {
  const commands = [];
  for (const command of clientCommands) {
    const commandObject = command[1]
    commands.push(commandObject.data.toJSON());
  }
  
  const rest = new REST().setToken(process.env.DISCORD_BOT_TOKEN);
  
  try {
    console.log(`Started refreshing ${commands.length} application (/) commands.`);
		// The put method is used to fully refresh all commands in the guild with the current set
    const data: Array<IDiscordCommandObjectEndpoint> = ( await rest.put(
			Routes.applicationGuildCommands(process.env.DISCORD_CLIENT_ID, process.env.DISCORD_GUILD_ID),
			{ body: commands },
		) as Array<IDiscordCommandObjectEndpoint> );
		console.log(`Successfully reloaded ${data.length} application (/) commands.`);
	} catch (error) {
		console.error(error);
	}
}

export { deployCommands };



