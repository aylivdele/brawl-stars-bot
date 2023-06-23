import { PermissionFlagsBits } from "discord.js";
import { Command } from "../types";

const command : Command = {
    name: "greet",
    execute: (message, args) => {
        let toGreet = message.mentions.members?.first()
        message.channel.send(`Да прибудет с тобой мортис, ${toGreet ? toGreet.user.username : message.member?.user.username}!`)
    },
    cooldown: 10,
    aliases: ["sayhello"],
    permissions: [PermissionFlagsBits.ManageEmojisAndStickers] // to test
}

export default command