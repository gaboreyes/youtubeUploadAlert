import { Collection, Events, GatewayIntentBits } from 'discord.js';
import { CustomDiscordClient } from '../app/CustomDiscordClient.ts';
import { deployDiscordCommands } from './deployCommand.ts';
import { fileURLToPath } from 'url';
import "dotenv/config.js";
import path from 'node:path'
import fs from 'node:fs'

const token = process.env.DISCORD_BOT_TOKEN
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Create a new custom client instance
const client = new CustomDiscordClient({ intents: [GatewayIntentBits.Guilds] });
client.commands = new Collection();

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

// When the client is ready, run this code (only once)
// We use 'c' for the event parameter to keep it separate from the already defined 'client'
client.once(Events.ClientReady, c => {
	console.log(`Ready! Logged in as ${c.user.tag}`);
});

// Log in to Discord with your client's token
client.login(token);

deployDiscordCommands(client.commands) //////////////////////////////////////////////////////////////////

client.on(Events.InteractionCreate, async interaction => {
	if (!interaction.isChatInputCommand()) return;
	// const command = interaction.client.commands.get(interaction.commandName);
	const givenCommand = client.commands.get(interaction.commandName);
	
	if (!givenCommand) {
		console.error(`No command matching ${interaction.commandName} was found.`);
		return;
	}
	
	try {
		await givenCommand.execute(interaction);
	} catch (error) {
		console.error(error);
		if (interaction.replied || interaction.deferred) {
			await interaction.followUp({ content: 'There was an error while executing this command!', ephemeral: true });
		} else {
			await interaction.reply({ content: 'There was an error while executing this command!', ephemeral: true });
		}
	}
});
