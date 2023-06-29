import {BaseGuildTextChannel, ChannelType, Message, NewsChannel, TextChannel, VoiceChannel} from "discord.js";
import { checkPermissions, getGuildOption, sendTimedMessage } from "../functions";
import { BotEvent } from "../types";
import mongoose from "mongoose";
import {
    ASK_FOR_INVITE_MESSAGE,
    ASK_ID_MESSAGE, getWaitingForApproveNotification,
    NOT_MEMBER_MESSAGE,
    WAIT_FOR_APPROVE_MESSAGE
} from "../messages/messages";
import {join} from "path";
import {ClubMembersList} from "../types/BrawlStarsAPIModel";
import {getUserFromGuild} from "../utils/utils";
import {brawlApi} from "../api/brawlApi";

const event: BotEvent = {
    name: "messageCreate",
    execute: async (message: Message) => {
        if (message.author.bot) return;
        console.log(message.id + ' New message: ' + message.content);
        if (!message.guild && message.author.dmChannel) {
            console.log(message.id + ' Not a guild message');
            const client = message.client;
            const author = message.author;
            const guildMember = await getUserFromGuild(author, client);
            if (guildMember && guildMember.roles.highest.name !== '@everyone') {
                console.log(message.id + ' Already in guild');
                return;
            }

            const dmChannel = author.dmChannel!;
            const brawlId = message.content.toUpperCase().match(/^#[A-Z\d]{8}$/)?.[0];

            if (!brawlId) {
                console.log(message.id + ' no brawl id');
                await dmChannel.send({ content: ASK_FOR_INVITE_MESSAGE, files: [ join(__dirname, '../static/AskIdImage.jpg') ]}).then(console.log, console.error);
                return;
            } else {
                const members : ClubMembersList | undefined = await brawlApi.getClubMembers() ?? [];
                const member = members.find(member => member.tag === brawlId);
                if (!member) {
                    dmChannel.send(NOT_MEMBER_MESSAGE);
                    return;
                } else {
                    dmChannel.send(WAIT_FOR_APPROVE_MESSAGE);

                    client.channels.fetch('1123632610887880784').then(channel => {
                        const m = getWaitingForApproveNotification(author.username, member.name, member.tag);
                        if (channel instanceof TextChannel) {
                            channel.send(m).then(mes => {
                                mes.react('✅');
                                mes.react('❌');
                            });
                        } else {
                            console.log(m);
                        }
                    })
                    return;
                }
            }

            return;
        }
        if (!message.guild || !message.member) return;
        let prefix = process.env.PREFIX
        if (mongoose.connection.readyState === 1) {
            let guildPrefix = await getGuildOption(message.guild, "prefix") 
                if (guildPrefix) prefix = guildPrefix;
        }

        if (!message.content.startsWith(prefix)) return;
        if (message.channel.type !== ChannelType.GuildText) return;

        let args = message.content.substring(prefix.length).split(" ")
        let command = message.client.commands.get(args[0])

        if (!command) {
            let commandFromAlias = message.client.commands.find((command) => command.aliases.includes(args[0]))
            if (commandFromAlias) command = commandFromAlias
            else return;
        }

        let cooldown = message.client.cooldowns.get(`${command.name}-${message.member.user.username}`)
        let neededPermissions = checkPermissions(message.member, command.permissions)
        if (neededPermissions !== null)
            return sendTimedMessage(
                `
            You don't have enough permissions to use this command. 
            \n Needed permissions: ${neededPermissions.join(", ")}
            `,
                message.channel,
                5000
            )


        if (command.cooldown && cooldown) {
            if (Date.now() < cooldown) {
                sendTimedMessage(
                    `You have to wait ${Math.floor(Math.abs(Date.now() - cooldown) / 1000)} second(s) to use this command again.`,
                    message.channel,
                    5000
                )
                return
            }
            message.client.cooldowns.set(`${command.name}-${message.member.user.username}`, Date.now() + command.cooldown * 1000)
            setTimeout(() => {
                message.client.cooldowns.delete(`${command?.name}-${message.member?.user.username}`)
            }, command.cooldown * 1000)
        } else if (command.cooldown && !cooldown) {
            message.client.cooldowns.set(`${command.name}-${message.member.user.username}`, Date.now() + command.cooldown * 1000)
        }

        command.execute(message, args)
    }
}

export default event
