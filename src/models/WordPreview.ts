import Identifiable from "./Identifiable"

export default class WordPreview extends Identifiable {

    public readonly title: string

    constructor(title: string, id?: string) {
        super(id)
        this.title = title
    }

}