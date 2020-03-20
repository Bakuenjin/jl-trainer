import TranslationType from "./TranslationType"
import Identifiable from "./Identifiable"

export default class Translation extends Identifiable {

    public readonly wordId: string
    public readonly type: TranslationType
    public readonly content: string

    constructor(wordId: string, type: TranslationType, content: string, id?: string) {
        super(id)
        this.wordId = wordId
        this.type = type
        this.content = content
    }

}