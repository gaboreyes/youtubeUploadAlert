import { Events } from 'discord.js';
import "dotenv/config.js";
import { startCommandListener } from './startCommandListener.ts';
import { deployCommands } from './deployCommand.ts';
import { addCommandsToClient } from './addCommandsToClient.ts';
import { generateDiscordBotClient } from './generateDiscordBotClient.ts';

let discordClient = generateDiscordBotClient()
discordClient = await addCommandsToClient(discordClient)
deployCommands(discordClient.commands)
startCommandListener(discordClient, Events.InteractionCreate)