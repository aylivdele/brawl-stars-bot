import { setGuildOption } from "../functions";
import { Command } from "../types";
import {PermissionFlagsBits} from "discord.js";

const command: Command = {
    name: "changePrefix",
    execute: async (message, args) => {
        let prefix = args[1]
        if (!prefix) return message.channel.send("No prefix provided")
        if (!message.guild) return;
        await setGuildOption(message.guild, "prefix", prefix)
        message.channel.send("Prefix successfully changed!")
    },
    permissions: [PermissionFlagsBits.Administrator],
    aliases: []
}

export default command