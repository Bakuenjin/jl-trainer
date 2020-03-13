import DatabaseHandler from "./DatabaseHandler";
import { Db, FilterQuery } from "mongodb";
import { Snowflake } from "discord.js";
import { collections } from './settings.json'
import { DbLection, DbWord, DbTranslation, DbStatistic } from "./DbTypes";

export default class DatabaseDeleteHandler extends DatabaseHandler {

    constructor(connetion: Db) {
        super(connetion)
    }

    private async delete<T>(collectionName: string, filter: FilterQuery<T>): Promise<void> {
        const collection = this.getCollection<T>(collectionName)
        await collection.deleteMany(filter)
    }

    private async deleteOne<T>(collectionName: string, filter: FilterQuery<T>): Promise<void> {
        const collection = this.getCollection<T>(collectionName)
        await collection.deleteOne(filter)
    }

    public async lectionByNameAndSnowflake(name: string, snowflake: Snowflake): Promise<void> {
        await this.deleteOne<DbLection>(collections.lections, { name, snowflake })
    }

    public async wordById(id: number): Promise<void> {
        await this.deleteOne<DbWord>(collections.words, { id })
    }

    public async translationById(id: number): Promise<void> {
        await this.deleteOne<DbTranslation>(collections.translations, { id })
    }

    public async wordStatisticByWordId(wordId: number): Promise<void> {
        await this.deleteOne<DbStatistic>(collections.statistics, { word_id: wordId })
    }

    public async wordsByLectionId(lectionId: number): Promise<void> {
        await this.delete<DbWord>(collections.words, { lection_id: lectionId })
    }

    public async translationsByWordId(wordId: number): Promise<void> {
        await this.delete<DbTranslation>(collections.translations, { word_id: wordId })
    }

}