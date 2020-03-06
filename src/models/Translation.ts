import TranslationType from "./TranslationType"

export default class Translation {

    public readonly id: number
    public readonly wordId: number
    public readonly type: TranslationType
    public readonly content: string

    constructor(id: number, wordId: number, type: TranslationType, content: string) {
        this.id = id
        this.wordId = wordId
        this.type = type
        this.content = content
    }

}