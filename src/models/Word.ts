import Translation from "./Translation"

export default class Word {

    public readonly id: number
    public readonly lectionId: number
    public readonly title: string
    public readonly nativeTip: string
    public readonly foreignTip: string
    public readonly nativeTranslation: Translation[]
    public readonly foreignTranslation: Translation[]

    constructor(id: number, lectionId: number, title: string, nativeTip: string, foreignTip: string, nativeTranslation: Translation[], foreignTranslation: Translation[]) {
        this.id = id
        this.lectionId = lectionId
        this.title = title
        this.nativeTip = nativeTip
        this.foreignTip = foreignTip
        this.nativeTranslation = nativeTranslation
        this.foreignTranslation = foreignTranslation
    }

}