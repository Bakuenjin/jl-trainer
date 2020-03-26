import Command from "../../Command";
import ArgumentSpecification from "../../../models/ArgumentSpecification";
import ActivatedCommand from "../../../models/ActivatedCommand";
import { db } from "../../..";
import Word from "../../../models/Word";
import SelectionManager from "../../../models/SelectionManager";
import { lectionNotFoundResponse, lectionNotSelectedResponse, wordAlreadyExistsResponse, wordCreatedResponse } from "../../../models/response-handling/ResponseList";

export default class WordCreateCommand extends Command {

    public readonly name: string[] = ['word-create', 'wc']
    public readonly description: string = 'This command adds a word to the specified lection.'
    public readonly arguments: ArgumentSpecification[] = [
        new ArgumentSpecification('word title', 'The title of this word. This is shown when displaying lection details', true)
    ]

    private _selectionManager: SelectionManager = SelectionManager.getInstance()

    public async execute(activatedCommand: ActivatedCommand): Promise<void> {
        if (!activatedCommand.message.author)
            return

        const snowflake = activatedCommand.message.author.id
        const userSelection = this._selectionManager.get(snowflake)

        if (!userSelection.lection) {
            const response = lectionNotSelectedResponse.buildResponse()
            activatedCommand.reply(response)
            return
        }

        const name = userSelection.lection.name
        const title = activatedCommand.args[0]

        const lection = await db.find.lectionByNameAndSnowflake(name, snowflake)

        if (!lection) {
            const response = lectionNotFoundResponse.buildResponse({ lectionName: name })
            activatedCommand.reply(response)
            return
        }

        if (lection.words.some(word => word.title === title)) {
            const response = wordAlreadyExistsResponse.buildResponse({ wordTitle: title })
            activatedCommand.reply(response)
            return
        }

        const newWord = new Word(lection.id, title)
        await db.insert.word(newWord)
        
        const response = wordCreatedResponse.buildResponse({ wordTitle: title, lectionName: name })
        activatedCommand.reply(response)
    }
    
}