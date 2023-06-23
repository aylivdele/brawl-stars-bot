import {REST, Routes} from "discord.js";
import {readdirSync} from "fs";
import {join} from "path";
import {SlashCommand} from "../types";

const getCommands = () => {
    const commands = [];
// Grab all the command files from the commands directory you created earlier
    const commandsPath = join(__dirname, '../slashCommands');

    // Grab all the command files from the commands directory you created earlier
    const commandFiles = readdirSync(commandsPath)
        .filter((file: string) => file.endsWith('.js'));
    // Grab the SlashCommandBuilder#toJSON() output of each command's data for deployment
    for (const file of commandFiles) {
        const filePath = join(commandsPath, file);
        const command = require(filePath).default;
        if (command.command && command.execute) {
            commands.push(command.command.toJSON());
        } else {
            console.log(`[WARNING] The command at ${filePath} is missing a required "command" or "execute" property.`);
        }
    }

    return commands;
}
export const registerCommands = async (guildId: string) => {
    try {
        const commands = getCommands();
        console.log(`Started refreshing ${commands.length} application (/) commands.`);

        const rest = new REST().setToken(process.env.TOKEN);

        // The put method is used to fully refresh all commands in the guild with the current set
        const data = await rest.put(
            Routes.applicationGuildCommands(process.env.CLIENT_ID, guildId),
            { body: commands },
        );

        // @ts-ignore
        console.log(`Successfully reloaded ${data.length} application (/) commands.`);
        // @ts-ignore
        return data.length;
    } catch (error) {
        // And of course, make sure you catch and log any errors!
        console.error(error);
        return 0;
    }
}