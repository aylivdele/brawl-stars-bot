import {BaseGuildTextChannel, Client} from "discord.js";
import { BotEvent } from "../types";
import { color } from "../functions";

const event : BotEvent = {
    name: "ready",
    once: true,
    execute: async (client: Client) => {
        console.log(
            color("text", `💪 Logged in as ${color("variable", client.user?.tag)}`)
        )
        const guild = await client.guilds.fetch('1121747554565107712');
        const channel = guild.channels.cache.get('1123632610887880784');
        if (channel && channel instanceof BaseGuildTextChannel) {
            await channel.messages.fetch();
        }
    }
}

export default event;