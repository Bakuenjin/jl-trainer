import settings from './settings.json'
import Module from '../bot-modules/Module.js'
import CommandManagerModule from '../bot-modules/modules/CommandManagerModule.js'
import Command from '../bot-commands/Command.js'

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
        
    ]

}

export default SettingsManager