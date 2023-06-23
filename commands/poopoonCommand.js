const { SlashCommandBuilder } = require('discord.js');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('ponpon')
        .setDescription('Кто такой попон?'),
    async execute(interaction) {
        await interaction.reply('Лох');
    },
};