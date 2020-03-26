import settings from './settings.json'
import Module from '../bot-modules/Module.js'
import CommandManagerModule from '../bot-modules/modules/CommandManagerModule.js'
import Command from '../bot-commands/Command.js'
import LectionCreateCommand from '../bot-commands/commands/lection/LectionCreateCommand'
import LectionListCommand from '../bot-commands/commands/lection/LectionListCommand'
import LectionRenameCommand from '../bot-commands/commands/lection/LectionRenameCommand'
import LectionRemoveCommand from '../bot-commands/commands/lection/LectionRemoveCommand'
import WordCreateCommand from '../bot-commands/commands/word/WordCreateCommand'
import SelectLectionCommand from '../bot-commands/commands/select/SelectLectionCommand'
import CurrentSelectionCommand from '../bot-commands/commands/select/CurrentSelectionCommand'
import LectionInfoCommand from '../bot-commands/commands/lection/LectionInfoCommand'

type MongoConfig = {
    url: string,
    database: string
}

class SettingsManager {

    private static _instance: SettingsManager

    public static getInstance(): SettingsManager {
        if (!this._instance)
            this._instance = new SettingsManager()
        return this._instance
    }

    public readonly token: string = settings.discord.token
    public readonly prefix: string = settings.discord.prefix
    public readonly mongoConfig: MongoConfig = settings.mongodb

    public readonly modules: Module[] = [
        new CommandManagerModule()
    ]

    public readonly commands: Command[] = [
        new CurrentSelectionCommand(),
        new SelectLectionCommand(),
        new LectionInfoCommand(),
        new LectionCreateCommand(),
        new LectionListCommand(),
        new LectionRenameCommand(),
        new LectionRemoveCommand(),
        new WordCreateCommand()
    ]

}

export default SettingsManager