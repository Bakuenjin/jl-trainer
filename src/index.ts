import { Client } from 'discord.js'
import SettingsManager from './settings/SettingsManager'
import ModuleManager from './bot-modules/ModuleManager'
import Database from './models/database/Database'

export const client = new Client()
export const db = new Database()
const settingsManager = SettingsManager.getInstance()
const moduleManager = ModuleManager.getInstance()

async function login() {
    await client.login(settingsManager.token)
    await db.connect(settingsManager.mongoConfig)
    console.log(`${client.user ? client.user.tag : 'Bot' } connected!`)
    moduleManager.setupModules(settingsManager.modules)
}

login()