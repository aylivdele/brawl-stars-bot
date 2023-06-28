import {Client, Guild, User} from "discord.js";
import {channel} from "diagnostics_channel";


export const isUserInGuild = (user: User, client: Client, guildId?: string): Promise<boolean> => {
    return client.guilds.fetch((guildId ?? process.env.GUILD_ID) as string)
        .then(guild => guild.members.fetch(user)
            .then(guildMember => {
                if (guildMember) {
                    return guildMember.roles.highest.name !== '@everyone';
                }
                return false;
            })
        );
}