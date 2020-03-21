import generateId from "../utils/generate-id"

export default class Identifiable {

    public readonly id: string

    constructor(id?: string) {
        this.id = id || generateId()
    }

}