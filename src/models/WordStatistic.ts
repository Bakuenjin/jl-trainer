export default class WordStatistic {

    public readonly id: number
    public readonly wordId: number
    public readonly correctAmount: number
    public readonly wrongAMount: number
    public readonly totalAmount: number

    constructor(id: number, wordId: number, correctAmount: number, wrongAmount: number, totalAmount: number) {
        this.id = id
        this.wordId = wordId
        this.correctAmount = correctAmount
        this.wrongAMount = wrongAmount
        this.totalAmount = totalAmount
    }

}