import Module from "../Module";
import Command from "../../bot-commands/Command";
import SettingsManager from "../../settings/SettingsManager";

import { Message, PartialMessage } from 'discord.js'
import convertMsgToActivatedCommand from "../../utils/convert-msg-to-activated-command";
import validArguments from "../../utils/valid-arguments";
import { client } from "../..";

export default class CommandManagerModule extends Module {

    private static _commands: { [name: string]: Command } = {}

    public static getCommands(): { [name: string]: Command } {
        return this._commands
    }

    private _prefix: string = ''

    public setup(): void {
        const settingsManager = SettingsManager.getInstance()
        this._prefix = settingsManager.prefix
        settingsManager.commands.forEach(this.register)
        this.observeMessages()
    }

    private register(command: Command): void {
        CommandManagerModule._commands[command.name] = command
    }

    private handleMessage(msg: Message | PartialMessage): void {
        const activatedCommand = convertMsgToActivatedCommand(msg, this._prefix)
        if (!activatedCommand)
            return
        
        const command: Command = CommandManagerModule._commands[activatedCommand.name]
        if (!command)
            return
        
        if (!validArguments(activatedCommand.args, command.arguments)) {
            activatedCommand.reply('Invalid arguments. Use the \`help\` command to find additional information about the commands.')
            return
        }
        
        console.log(`Command '${activatedCommand.name}' activated!`)
        command.execute(activatedCommand)
    }

    private observeMessages(): void {
        client.on('message', (msg) => this.handleMessage(msg))
    }

}