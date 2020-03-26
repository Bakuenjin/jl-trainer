import Command from "../../Command"
import ArgumentSpecification from "../../../models/ArgumentSpecification"
import ActivatedCommand from "../../../models/ActivatedCommand"
import { db } from "../../.."
import SelectionManager from "../../../models/SelectionManager"
import { lectionNotSelectedResponse, lectionNotFoundResponse, wordNotInSelectedLectionResponse, wordNotFoundResponse, wordSelectedResponse } from "../../../models/response-handling/ResponseList"

export default class SelectWordCommand extends Command {

    public readonly name: string[] = ['select-word', 'sw']
    public readonly description: string = 'This command selects the specified word, if it fits with the currently selected lection.'
    public readonly arguments: ArgumentSpecification[] = [
        new ArgumentSpecification('word title', 'The title of the word that should be selected.', true)
    ]

    private _selection: SelectionManager = SelectionManager.getInstance()

    public async execute(activatedCommand: ActivatedCommand): Promise<void> {
        if (!activatedCommand.message.author)
            return

        const title = activatedCommand.args[0]
        const snowflake = activatedCommand.message.author.id
        const selection = this._selection.get(snowflake)

        if (!selection.lection) {
            const response = lectionNotSelectedResponse.buildResponse()
            activatedCommand.reply(response)
            return
        }

        const name = selection.lection.name
        const lection = await db.find.lectionByNameAndSnowflake(name, snowflake)

        if (!lection) {
            const response = lectionNotFoundResponse.buildResponse({ lectionName: name })
            activatedCommand.reply(response)
            return
        }

        const word = lection.words.find(word => word.title === title)

        if (!word) {
            const response = wordNotInSelectedLectionResponse.buildResponse({ lectionName: name, wordTitle: title })
            activatedCommand.reply(response)
            return
        }

        const fullWord = await db.find.wordById(word.id)

        if (!fullWord) {
            const response = wordNotFoundResponse.buildResponse({ wordTitle: title })
            activatedCommand.reply(response)
            return
        }

        this._selection.deselect(snowflake, 'translation')
        this._selection.select(snowflake, 'word', fullWord)

        const response = wordSelectedResponse.buildResponse({ wordTitle: title })
        activatedCommand.reply(response)
    }  

}