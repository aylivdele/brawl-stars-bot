"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.registerCommands = void 0;
const discord_js_1 = require("discord.js");
const fs_1 = require("fs");
const path_1 = require("path");
const getCommands = () => {
    const commands = [];
    // Grab all the command files from the commands directory you created earlier
    const commandsPath = (0, path_1.join)(__dirname, '../slashCommands');
    // Grab all the command files from the commands directory you created earlier
    const commandFiles = (0, fs_1.readdirSync)(commandsPath)
        .filter((file) => file.endsWith('.js'));
    // Grab the SlashCommandBuilder#toJSON() output of each command's data for deployment
    for (const file of commandFiles) {
        const filePath = (0, path_1.join)(commandsPath, file);
        const command = require(filePath).default;
        if (command.command && command.execute) {
            commands.push(command.command.toJSON());
        }
        else {
            console.log(`[WARNING] The command at ${filePath} is missing a required "command" or "execute" property.`);
        }
    }
    return commands;
};
const registerCommands = (guildId) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const commands = getCommands();
        console.log(`Started refreshing ${commands.length} application (/) commands.`);
        const rest = new discord_js_1.REST().setToken(process.env.TOKEN);
        // The put method is used to fully refresh all commands in the guild with the current set
        const data = yield rest.put(discord_js_1.Routes.applicationGuildCommands(process.env.CLIENT_ID, guildId), { body: commands });
        // @ts-ignore
        console.log(`Successfully reloaded ${data.length} application (/) commands.`);
        // @ts-ignore
        return data.length;
    }
    catch (error) {
        // And of course, make sure you catch and log any errors!
        console.error(error);
        return 0;
    }
});
exports.registerCommands = registerCommands;
