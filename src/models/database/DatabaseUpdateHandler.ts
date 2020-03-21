import DatabaseHandler from "./DatabaseHandler";
import { Db, FilterQuery, UpdateQuery, MatchKeysAndValues } from "mongodb";
import { Snowflake } from "discord.js";
import { DbLection, DbPartial, DbWord, DbTranslation, DbStatistic } from "./DbTypes";
import { collections } from './settings.json'

export default class DatabaseUpdateHandler extends DatabaseHandler {

    constructor(connection: Db) {
        super(connection)
    }

    private async update<T>(collectionName: string, filter: FilterQuery<T>, data: MatchKeysAndValues<T>): Promise<void> {
        const collection = this.getCollection<T>(collectionName)
        await collection.updateOne(filter, { $set: data })
    }

    public async lectionNameByNameAndSnowflake(snowflake: Snowflake, oldName: string, newName: string): Promise<void> {
        await this.update<DbLection>(collections.lections, { name: oldName, snowflake: snowflake }, { name: newName })
    }

    public async wordById(id: string, changes: DbPartial<DbWord>): Promise<void> {
        await this.update<DbWord>(collections.words, { id }, changes)
    }

    public async translationById(id: string, changes: DbPartial<DbTranslation>): Promise<void> {
        await this.update<DbTranslation>(collections.translations, { id }, changes)
    }

    public async statisticByWordId(wordId: string, changes: DbPartial<DbStatistic>): Promise<void> {
        await this.update<DbStatistic>(collections.statistics, { word_id: wordId }, changes)
    }

}