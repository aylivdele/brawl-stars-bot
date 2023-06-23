const { REST, Routes } = require('discord.js');

const registerCommands = async (commands, token, clientId, guildId) => {
    try {
        console.log(`Started refreshing ${commands.length} application (/) commands.`);

        const rest = new REST().setToken(token);

        // The put method is used to fully refresh all commands in the guild with the current set
        const data = await rest.put(
            Routes.applicationGuildCommands(clientId, guildId),
            { body: commands },
        );

        console.log(`Successfully reloaded ${data.length} application (/) commands.`);
    } catch (error) {
        // And of course, make sure you catch and log any errors!
        console.error(error);
    }
}
module.exports = registerCommands;