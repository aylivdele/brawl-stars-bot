import {DMChannel, GuildMember} from "discord.js";
import { BotEvent } from "../types";
import {ASK_ID_MESSAGE} from "../messages/messages";
import {join} from "path";

const event: BotEvent = {
    name: "guildMemberAdd",
    execute: async (member: GuildMember) => {
        let dmChannel: DMChannel | null = member.dmChannel;
        if (!dmChannel) {
            dmChannel = await member.createDM(true)
        }
        dmChannel.send({ content: ASK_ID_MESSAGE, files: [ join(__dirname, '../static/AskIdImage.jpg') ]});
    }
}

export default event;