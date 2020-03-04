import Module from './Module'

export default class ModuleManager {

    private static _instance: ModuleManager

    public static getInstance(): ModuleManager {
        if (!this._instance)
            this._instance = new ModuleManager()
        return this._instance
    }

    private constructor() {}

    private setupModule(mod: Module): void {
        mod.setup()
    }

    public setupModules(modules: Module[]): void {
        modules.forEach(this.setupModule)
        console.log('All modules initialized!')
    }

}