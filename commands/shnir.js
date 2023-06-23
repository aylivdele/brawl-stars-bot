const { SlashCommandBuilder } = require('discord.js');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('shnir')
        .setDescription('Кто такой шнырь'),
    async execute(interaction) {
        await interaction.reply('Шнырь попуск, вход строго запрещен!');
    },
};