import { MongoClient, MongoClientOptions, Db } from 'mongodb'
import DatabaseFindHandler from './DatabaseFindHandler.js'
import DatabaseInsertHandler from './DatabaseInsertHandler.js'
import DatabaseUpdateHandler from './DatabaseUpdateHandler.js'
import DatabaseDeleteHandler from './DatabaseDeleteHandler.js'

type MongoConfig = {
    url: string,
    database: string
}

export default class Database {

    public find!: DatabaseFindHandler
    public insert!: DatabaseInsertHandler
    public update!: DatabaseUpdateHandler
    public delete!: DatabaseDeleteHandler

    private init(connection: Db): void {
        this.find = new DatabaseFindHandler(connection)
        this.insert = new DatabaseInsertHandler(connection)
        this.update = new DatabaseUpdateHandler(connection)
        this.delete = new DatabaseDeleteHandler(connection)
    }

    public connect(config: MongoConfig): Promise<void> {
        return new Promise((resolve, reject) => {
            const options: MongoClientOptions = { useNewUrlParser: true, useUnifiedTopology: true }
            MongoClient.connect(config.url, options, (err, client) => {
                if (err) reject(err)
                else {
                    const connection = client.db(config.database)
                    this.init(connection)
                    resolve()
                }
            })
        })
    }

}
