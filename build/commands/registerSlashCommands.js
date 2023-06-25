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
const discord_js_1 = require("discord.js");
const registerSlashCommands_1 = require("../utils/registerSlashCommands");
const command = {
    name: "registerSlashCommands",
    execute: (message, args) => __awaiter(void 0, void 0, void 0, function* () {
        if (!message.guild)
            return;
        const length = yield (0, registerSlashCommands_1.registerCommands)(message.guild.id);
        message.channel.send(`Установлено ${length} комманд.`);
    }),
    permissions: [discord_js_1.PermissionFlagsBits.Administrator],
    aliases: []
};
exports.default = command;
