import { setGuildOption } from "../functions";
import { Command } from "../types";
import {PermissionFlagsBits} from "discord.js";
import {registerCommands} from "../utils/registerSlashCommands";

const command: Command = {
    name: "registerSlashCommands",
    execute: async (message, args) => {
        if (!message.guild) return;
        const length = await registerCommands(message.guild.id);
        message.channel.send(`Установлено ${ length } комманд.`);
    },
    permissions: [PermissionFlagsBits.Administrator],
    aliases: []
}

export default command