import {Client, GatewayIntentBits, Collection, PermissionFlagsBits, PresenceData, ClientPresence,} from "discord.js";
const { Guilds, MessageContent, GuildMessages, GuildMembers } = GatewayIntentBits
const client = new Client({intents:[Guilds, MessageContent, GuildMessages, GuildMembers]})
import { Command, SlashCommand } from "./types";
import { config } from "dotenv";
import { readdirSync } from "fs";
import { join } from "path";
config()

client.slashCommands = new Collection<string, SlashCommand>()
client.commands = new Collection<string, Command>()
client.cooldowns = new Collection<string, number>()


try {
    const handlersDir = join(__dirname, "./handlers")
    readdirSync(handlersDir).forEach(handler => {
        require(`${handlersDir}/${handler}`)(client)
    })
} catch (error) {
    console.error(error)
}

console.log('Logging')
client.login(process.env.TOKEN)
    .then(() => client.user?.setPresence({status: 'online', activities: [{ name: 'Brawl stars', type: 0 }]}))
    .catch(error => {
    console.error('Login exception');
    console.error(error);
})

