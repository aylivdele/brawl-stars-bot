import {Client, Collection, GatewayIntentBits, Partials, PermissionFlagsBits,} from "discord.js";
import {Command, SlashCommand} from "./types";
import {config} from "dotenv";
import {readdirSync} from "fs";
import {join} from "path";
import express, { Request, Response } from "express";

const { Guilds, MessageContent, GuildMessages, GuildMembers, DirectMessages } = GatewayIntentBits
const client = new Client({intents:[Guilds, MessageContent, GuildMessages, GuildMembers, DirectMessages], partials: [Partials.Channel]});

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
    .then(() => client.user?.setPresence({activities: [{ name: 'Brawl Stars', type: 0 }]}))
    .then(() => client.user?.setAvatar(join(__dirname, 'static/HankAvatar.png')))
    .catch(error => {
    console.error('Login exception');
    console.error(error);
})

const app = express();
const port = process.env.PORT;
app.get('/', (req: Request, res: Response) => {
    res.send('Express + TypeScript Server');
});

app.listen(port, () => {
    console.log(`⚡️[server]: Server is running on port: ${port}`);
});


