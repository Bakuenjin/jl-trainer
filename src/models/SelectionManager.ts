import { Snowflake } from "discord.js";
import Lection from "./Lection";
import Word from "./Word";
import Translation from "./Translation";

type UserSelection = {
    lection?: Lection
    word?: Word
    translation?: Translation
}

export default class SelectionManager {

    private static _instance: SelectionManager

    public static getInstance(): SelectionManager {
        if (!this._instance)
            this._instance = new SelectionManager()
        return this._instance
    }

    private _selections: Map<Snowflake, UserSelection>

    private constructor() {
        this._selections = new Map<Snowflake, UserSelection>()
    }

    public get(snowflake: Snowflake): UserSelection {
        return this._selections.get(snowflake) || {}
    }

    public select(snowflake: Snowflake, key: keyof UserSelection, value: Lection | Word | Translation): void {
        const selection = this._selections.get(snowflake) || {}
        selection[key] = <any>value
        this._selections.set(snowflake, selection)
    }

    public deselect(snowflake: Snowflake, key: keyof UserSelection): void {
        const selection = this._selections.get(snowflake) || {}
        selection[key] = undefined
        this._selections.set(snowflake, selection)
    }

    public clear(snowflake: Snowflake): void {
        this._selections.delete(snowflake)
    }

}