import { Events } from 'discord.js';
import "dotenv/config.js";
import { addCommandsToClient } from './addCommandsToClient.ts';
import { deployCommands } from './deployCommand.ts';
import { generateDiscordBotClient } from './generateDiscordBotClient.ts';
import { startCommandListener } from './startCommandListener.ts';

let discordClient = generateDiscordBotClient()
discordClient = await addCommandsToClient(discordClient)
deployCommands(discordClient.commands)
startCommandListener(discordClient, Events.InteractionCreate)