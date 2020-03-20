import Translation from "./Translation"
import Identifiable from "./Identifiable"

export default class Word extends Identifiable {

    public readonly lectionId: string
    public readonly title: string
    public readonly nativeTip: string
    public readonly foreignTip: string
    public readonly nativeTranslation: Translation[]
    public readonly foreignTranslation: Translation[]

    constructor(lectionId: string, title: string, nativeTip: string, foreignTip: string, nativeTranslation: Translation[], foreignTranslation: Translation[], id?: string) {
        super(id)
        this.lectionId = lectionId
        this.title = title
        this.nativeTip = nativeTip
        this.foreignTip = foreignTip
        this.nativeTranslation = nativeTranslation
        this.foreignTranslation = foreignTranslation
    }

}