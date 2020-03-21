import Identifiable from "./Identifiable"

export default class WordStatistic extends Identifiable {

    public readonly wordId: string
    public readonly correctAmount: number
    public readonly wrongAMount: number
    public readonly totalAmount: number

    constructor(wordId: string, correctAmount: number, wrongAmount: number, totalAmount: number, id?: string) {
        super(id)
        this.wordId = wordId
        this.correctAmount = correctAmount
        this.wrongAMount = wrongAmount
        this.totalAmount = totalAmount
    }

}