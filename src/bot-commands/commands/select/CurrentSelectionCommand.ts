import Command from "../../Command"
import ArgumentSpecification from "../../../models/ArgumentSpecification"
import ActivatedCommand from "../../../models/ActivatedCommand"
import SelectionManager from "../../../models/SelectionManager"
import { currentSelectionInfoResponse } from "../../../models/response-handling/ResponseList"

export default class CurrentSelectionCommand extends Command {

    public readonly name: string[] = ['current-selection', 'cs']
    public readonly description: string = 'This command shows what lection, word and translation is currently selected for editing.'
    public readonly arguments: ArgumentSpecification[] = []

    private _selectionManager: SelectionManager = SelectionManager.getInstance()

    public async execute(activatedCommand: ActivatedCommand): Promise<void> {
        if (!activatedCommand.message.author)
            return

        const snowflake = activatedCommand.message.author.id
        const userSelection = this._selectionManager.get(snowflake)

        const lectionName = userSelection.lection ? userSelection.lection.name : 'No lection selected'
        const wordTitle = userSelection.word ? userSelection.word.title : 'No word selected'
        const translationContent = userSelection.translation ? userSelection.translation.content : 'No translation selected'

        const response = currentSelectionInfoResponse.buildResponse({ lectionName, wordTitle, translationContent })
        activatedCommand.reply(response)
    }  

}