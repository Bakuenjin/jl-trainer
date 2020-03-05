import settings from './settings.json'
import * as mysql from 'mysql'
import SQLString from 'sqlstring'
import { Snowflake } from 'discord.js'

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

    getLectionsByUserId(userId: Snowflake): Promise<string[]> {
        return new Promise((resolve, reject) => {
            const sqlQuery = SQLString.format('SELECT name FROM lections WHERE lections.userId = ?', [userId])
            this._connection.query(sqlQuery, (err, results: { name: string }[]) => {
                if (err)    reject(err)
                else        resolve(results.map(result => result.name))
            })
        })
    }

}