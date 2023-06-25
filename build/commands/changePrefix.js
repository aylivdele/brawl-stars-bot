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
const functions_1 = require("../functions");
const discord_js_1 = require("discord.js");
const command = {
    name: "changePrefix",
    execute: (message, args) => __awaiter(void 0, void 0, void 0, function* () {
        let prefix = args[1];
        if (!prefix)
            return message.channel.send("No prefix provided");
        if (!message.guild)
            return;
        yield (0, functions_1.setGuildOption)(message.guild, "prefix", prefix);
        message.channel.send("Prefix successfully changed!");
    }),
    permissions: [discord_js_1.PermissionFlagsBits.Administrator],
    aliases: []
};
exports.default = command;
