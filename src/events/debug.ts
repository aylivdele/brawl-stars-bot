import { Client } from "discord.js";
import { BotEvent } from "../types";
import { color } from "../functions";

const event : BotEvent = {
    name: "debug",
    execute: (debug : any) => {
        console.log(
            debug
        )
    }
}

export default event;