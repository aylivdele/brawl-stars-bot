import {Client, Guild, GuildMember, User} from "discord.js";
import {channel} from "diagnostics_channel";


export const getUserFromGuild = (user: User, client: Client, guildId?: string): Promise<GuildMember> => {
    return client.guilds.fetch((guildId ?? process.env.GUILD_ID) as string)
        .then(guild => guild.members.fetch(user));
}