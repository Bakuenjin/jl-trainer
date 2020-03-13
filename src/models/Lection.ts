import { Snowflake } from "discord.js"
import WordPreview from "./WordPreview"

export default class Lection {

    public readonly id: number
    public readonly snowflake: Snowflake
    public readonly name: string
    public readonly words: WordPreview[]

    constructor(id: number, snowflake: Snowflake, name: string, words: WordPreview[]) {
        this.id = id
        this.snowflake = snowflake
        this.name = name
        this.words = words
    }

}