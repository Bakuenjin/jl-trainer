import { MongoClient } from 'mongodb'
import settings from './settings.json'
import DatabaseFindHandler from './DatabaseFindHandler.js'
import DatabaseInsertHandler from './DatabaseInsertHandler.js'
import DatabaseUpdateHandler from './DatabaseUpdateHandler.js'
import DatabaseDeleteHandler from './DatabaseDeleteHandler.js'

export default class Database {

    public find!: DatabaseFindHandler
    public insert!: DatabaseInsertHandler
    public update!: DatabaseUpdateHandler
    public delete!: DatabaseDeleteHandler

    private init(client: MongoClient): void {
        const connection = client.db(settings.database)
        this.find = new DatabaseFindHandler(connection)
        this.insert = new DatabaseInsertHandler(connection)
        this.update = new DatabaseUpdateHandler(connection)
        this.delete = new DatabaseDeleteHandler(connection)
    }

    public connect(): Promise<void> {
        return new Promise((resolve, reject) => {
            MongoClient.connect(settings.url, (err, client) => {
                if (err) reject(err)
                else {
                    this.init(client)
                    resolve()
                }
            })
        })
    }

}
