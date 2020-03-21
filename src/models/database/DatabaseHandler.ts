import { Db, Collection } from "mongodb";
import { DatabaseNotConnectedError } from "../../utils/errors";

export default class DatabaseHandler {

    protected _connection: Db

    constructor(connection: Db) {
        this._connection = connection
    }

    protected getCollection<T>(collectionName: string): Collection<T> {
        if (!this._connection)
            throw new DatabaseNotConnectedError()
        return this._connection.collection<T>(collectionName)
    }

}