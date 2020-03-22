import { Snowflake } from "discord.js"
import WordPreview from "./WordPreview"
import generateId from "../utils/generate-id"
import Identifiable from "./Identifiable"

export default class Lection extends Identifiable {

    public readonly snowflake: Snowflake
    public readonly name: string
    public readonly words: WordPreview[]

    constructor(snowflake: Snowflake, name: string, words: WordPreview[] = [], id?: string) {
        super(id)
        this.snowflake = snowflake
        this.name = name
        this.words = words
    }

}