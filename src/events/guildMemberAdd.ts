import {DMChannel, GuildMember} from "discord.js";
import { BotEvent } from "../types";

const event: BotEvent = {
    name: "guildMemberAdd",
    execute: async (member: GuildMember) => {
        let dmChannel: DMChannel | null = member.dmChannel;
        if (!dmChannel) {
            dmChannel = await member.createDM(true)
        }
        dmChannel.send("Какой у тебя Тег в Бравле?");

    }
}

export default event;