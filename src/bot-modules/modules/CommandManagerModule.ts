import Module from "../Module";
import Command from "../../bot-commands/Command";
import SettingsManager from "../../settings/SettingsManager";

import { Message, PartialMessage } from 'discord.js'
import convertMsgToActivatedCommand from "../../utils/convert-msg-to-activated-command";
import validArguments from "../../utils/valid-arguments";
import { client } from "../..";
import { invalidArgumentsResponse } from "../../models/response-handling/ResponseList";

export default class CommandManagerModule extends Module {

    private static _instance: CommandManagerModule
    public static getInstance(): CommandManagerModule {
        if (!this._instance)
            this._instance = new CommandManagerModule()
        return this._instance
    }

    private _prefix: string = ''
    private _commands: Command[] = []

    public setup(): void {
        const settingsManager = SettingsManager.getInstance()
        this._prefix = settingsManager.prefix
        this._commands = settingsManager.commands
        this.observeMessages()
    }

    private findCommand(commandName: string): Command | undefined {
        return this._commands.find(command => command.name.includes(commandName))
    }

    private handleMessage(msg: Message | PartialMessage): void {
        const activatedCommand = convertMsgToActivatedCommand(msg, this._prefix)
        if (!activatedCommand)
            return
        
        const command = this.findCommand(activatedCommand.name)
        if (!command)
            return
        
        if (!validArguments(activatedCommand.args, command.arguments)) {
            const response = invalidArgumentsResponse.buildResponse()
            activatedCommand.reply(response)
            return
        }
        
        console.log(`Command '${activatedCommand.name}' activated!`)
        command.execute(activatedCommand)
    }

    private observeMessages(): void {
        client.on('message', (msg) => this.handleMessage(msg))
    }

}