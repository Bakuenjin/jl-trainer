import settings from './settings.json'
import * as mysql from 'mysql'

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

}