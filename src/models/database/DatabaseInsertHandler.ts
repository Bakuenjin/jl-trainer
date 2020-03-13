import DatabaseHandler from "./DatabaseHandler";
import { Db } from "mongodb";
import Lection from "../Lection";
import { DbLection, DbWord, DbTranslation, DbStatistic } from "./DbTypes";
import { convertLectionToDbLection, convertWordToDbWord, convertTranslationToDbTranslation, convertWordStatisticToDbStatistic } from "../../utils/database-utils";
import { collections } from './settings.json'
import Word from "../Word";
import Translation from "../Translation";
import WordStatistic from "../WordStatistic";

export default class DatabaseInsertHandler extends DatabaseHandler {

    constructor(connection: Db) {
        super(connection)
    }

    private async insert<T>(collectionName: string, data: any): Promise<void> {
        const collection = this.getCollection<T>(collectionName)
        await collection.insertOne(data)
    }

    public async lection(lection: Lection): Promise<void> {
        const dbLection = convertLectionToDbLection(lection)
        await this.insert<DbLection>(collections.lections, dbLection)
    }

    public async word(word: Word): Promise<void> {
        const dbWord = convertWordToDbWord(word)
        await this.insert<DbWord>(collections.words, dbWord)
    }

    public async translation(translation: Translation): Promise<void> {
        const dbTranslation = convertTranslationToDbTranslation(translation)
        await this.insert<DbTranslation>(collections.translations, dbTranslation)
    }

    public async wordStatistic(wordStatistic: WordStatistic): Promise<void> {
        const dbStatistic = convertWordStatisticToDbStatistic(wordStatistic)
        await this.insert<DbStatistic>(collections.statistics, dbStatistic)
    }
}