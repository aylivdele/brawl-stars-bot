import { SlashCommand } from "../types";
import {SlashCommandBuilder} from "discord.js";

const command: SlashCommand = {
    command: new SlashCommandBuilder()
        .setName('popusk')
        .setDescription('Узнать кто главный попуск.'),
    execute: async (interaction) => {
        if (!interaction.guild) return;
        await interaction.reply("Главным попуском является Шнырь!\nЕсли видишь его в чате, то кинь ему 💩.");
    },
}

export default command