import { Client } from 'discord.js'
import SettingsManager from './settings/SettingsManager'
import ModuleManager from './bot-modules/ModuleManager'

export const client = new Client()
const settingsManager = SettingsManager.getInstance()
const moduleManager = ModuleManager.getInstance()

async function login() {
    await client.login(settingsManager.token)
    console.log(`${client.user ? client.user.tag : 'Bot' } connected!`)
    moduleManager.setupModules(settingsManager.modules)
}

login()