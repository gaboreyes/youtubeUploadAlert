import { Collection, Events, GatewayIntentBits } from 'discord.js';
import "dotenv/config.js";
import { CustomDiscordClient } from '../app/CustomDiscordClient.ts';

function generateDiscordBotClient(){
	const client = new CustomDiscordClient({ intents: [GatewayIntentBits.Guilds] });
	client.commands = new Collection();
	// When the client is ready, run this code (only once)
	// We use 'c' for the event parameter to keep it separate from the already defined 'client'
	client.once(Events.ClientReady, c => {
		console.log(`Ready! Logged in as ${c.user.tag}`);
	});
	client.login(process.env.DISCORD_BOT_TOKEN);
	return client
}

export { generateDiscordBotClient }