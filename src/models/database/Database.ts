import settings from './settings.json'
import queries from './queries.json'
import * as mysql from 'mysql'
import SQLString from 'sqlstring'
import { Snowflake } from 'discord.js'
import Lection from '../Lection.js'
import Word from '../Word.js'
import { DbLection, DbWord, DbWordPreview, DbTranslation, DbStatistic } from './DbTypes.js'
import WordPreview from '../WordPreview.js'
import { isNativeTranslation, isForeignTranslation } from '../../utils/database-utils.js'
import Translation from '../Translation.js'
import WordStatistic from '../WordStatistic.js'

export default class Database {

    private _connection: mysql.Connection

    public constructor() {
        this._connection = mysql.createConnection(settings)
    }

    connect(): Promise<void> {
        return new Promise((resolve, reject) => {
            this._connection.connect((err) => {
                if (err)    reject(err)
                else        resolve()
            })
        })
    }

    private query<T>(sqlQuery: string): Promise<T[]> {
        return new Promise((resolve, reject) => {
            this._connection.query(sqlQuery, (err, res: T[]) => {
                if (err)    reject(err)
                else        resolve(res)
            })
        })
    }

    async getLectionNamesByUserId(userId: Snowflake): Promise<string[]> {
        const sqlQuery = SQLString.format(queries.lectionNamesByUserId, [userId])
        return await this.query<string>(sqlQuery)
    }

    async getLectionBySnowflakeAndName(snowflake: Snowflake, name: string): Promise<Lection> {
        const sqlLectionsQuery = SQLString.format(queries.lectionBySnowflakeAndName, [snowflake, name])
        const dbLection = (await this.query<DbLection>(sqlLectionsQuery))[0]
        const sqlWordsQuery = SQLString.format(queries.wordsByLectionId, [dbLection.id])
        const dbWords = await this.query<DbWordPreview>(sqlWordsQuery)
        const words = dbWords.map(dbWord => new WordPreview(dbWord.id, dbWord.title))
        return new Lection(dbLection.id, dbLection.snowflake, dbLection.name, dbLection.description, words)
    }

    async getWordById(wordId: number): Promise<Word> {
        const sqlWordQuery = SQLString.format(queries.wordById, [wordId])
        const dbWord = (await this.query<DbWord>(sqlWordQuery))[0]
        const sqlTranslationsQuery = SQLString.format(queries.translationsByWordId, [wordId])
        const dbTranslations = await this.query<DbTranslation>(sqlTranslationsQuery)
        const natives = dbTranslations.filter(isNativeTranslation).map(t => new Translation(t.id, t.word_id, t.type_id, t.content))
        const foreigns = dbTranslations.filter(isForeignTranslation).map(t => new Translation(t.id, t.word_id, t.type_id, t.content))
        return new Word(dbWord.id, dbWord.lection_id, dbWord.title, dbWord.native_tip, dbWord.foreign_tip, natives, foreigns )
    }

    async getWordStatisticByWordId(wordId: number): Promise<WordStatistic> {
        const sqlStatQuery = SQLString.format(queries.wordStatisticByWordId, [wordId])
        const dbStat = (await this.query<DbStatistic>(sqlStatQuery))[0]
        return new WordStatistic(dbStat.id, dbStat.word_id, dbStat.correct_amount, dbStat.wrong_amount, dbStat.total_amount)
    }

}