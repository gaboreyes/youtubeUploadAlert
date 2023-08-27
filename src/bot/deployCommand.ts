import "dotenv/config.js";
import { REST, Routes } from 'discord.js';

async function deployDiscordCommands(clientCommands: any){
  const commands = [];
  for (const command of clientCommands) {
    // Each command is a list with [commandName, commandObject] and Each commandObject has attributes { data, execute }
    const commandObject = command[1]
    commands.push(commandObject.data.toJSON());
  }

  // Construct and prepare an instance of the REST module
  const rest = new REST().setToken(process.env.DISCORD_BOT_TOKEN);
  
  // and deploy your commands given the guild id!
  try {
		console.log(`Started refreshing ${commands.length} application (/) commands.`);

		// The put method is used to fully refresh all commands in the guild with the current set
		
    const data: any = await rest.put(
			Routes.applicationGuildCommands(process.env.DISCORD_CLIENT_ID, process.env.DISCORD_GUILD_ID),
			{ body: commands },
		);

		console.log(`Successfully reloaded ${data.length} application (/) commands.`);
	} catch (error) {
		// And of course, make sure you catch and log any errors!
		console.error(error);
	}
}

export { deployDiscordCommands }



