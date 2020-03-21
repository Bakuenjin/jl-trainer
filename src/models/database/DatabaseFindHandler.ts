import { Db, FilterQuery } from "mongodb";
import DatabaseHandler from "./DatabaseHandler";
import { Snowflake } from "discord.js";
import { DbLection, DbWord, DbTranslation, DbStatistic } from "./DbTypes";
import WordPreview from "../WordPreview";
import Translation from "../Translation";
import WordStatistic from "../WordStatistic";
import Word from "../Word";
import Lection from "../Lection";
import { isNativeTranslation, isForeignTranslation } from "../../utils/database-utils";
import { collections } from './settings.json'

export default class DatabaseFindHandler extends DatabaseHandler {

    constructor(connection: Db) {
        super(connection)
    }

    private async find<T>(collectionName: string, filter: FilterQuery<T>): Promise<T[]> {
        const collection = this.getCollection<T>(collectionName)
        return collection.find(filter).toArray()
    }

    private async findOne<T>(collectionName: string, filter: FilterQuery<T>): Promise<T | null> {
        const collection = this.getCollection<T>(collectionName)
        return collection.findOne(filter)
    }

    public async lectionNamesBySnowflake(snowflake: Snowflake): Promise<string[]> {
        const results = await this.find<DbLection>(collections.lections, { snowflake })
        return results.map(result => result.name)
    }

    public async wordsByLectionId(lectionId: string): Promise<WordPreview[]> {
        const results = await this.find<DbWord>(collections.words, { lection_id: lectionId })
        return results.map(result => new WordPreview(result.title, result.id))
    }

    public async translationsByWordId(wordId: string): Promise<Translation[]> {
        const results = await this.find<DbTranslation>(collections.translations, { word_id: wordId })
        return results.map(result => new Translation(result.word_id, result.type_id, result.content, result.id))
    }

    public async wordStatisticByWordId(wordId: string): Promise<WordStatistic | null> {
        const res = await this.findOne<DbStatistic>(collections.statistics, { word_id: wordId })
        if (!res)
            return null
        
        return new WordStatistic(res.word_id, res.correct_amount, res.wrong_amount, res.total_amount, res.id)
    }

    public async wordById(id: string): Promise<Word | null> {
        const res = await this.findOne<DbWord>(collections.words, { id })
        if (!res)
            return null

        const translations = await this.translationsByWordId(res.id)
        const nativeTranslations = translations.filter(isNativeTranslation)
        const foreignTranslations = translations.filter(isForeignTranslation)
        return new Word(res.lection_id, res.title, res.native_tip, res.foreign_tip, nativeTranslations, foreignTranslations, res.id)
    }

    public async lectionByNameAndSnowflake(name: string, snowflake: Snowflake): Promise<Lection | null> {
        const res = await this.findOne<DbLection>(collections.lections, { name, snowflake })
        if (!res)
            return null
        
        const words = await this.wordsByLectionId(res.id)
        return new Lection(res.snowflake, res.name, words, res.id)
    }

}