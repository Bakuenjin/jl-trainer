import Command from "../../Command";
import ArgumentSpecification from "../../../models/ArgumentSpecification";
import ActivatedCommand from "../../../models/ActivatedCommand";
import { db } from "../../..";
import { lectionNotFoundResponse, lectionInfoResponse, noArgAndSelectedLectionResponse } from "../../../models/response-handling/ResponseList";
import SelectionManager from "../../../models/SelectionManager";

export default class LectionInfoCommand extends Command {

    public readonly name: string[] = ['lection-info', 'li']
    public readonly description: string = 'This command shows information about the specified lection.'
    public readonly arguments: ArgumentSpecification[] = [
        new ArgumentSpecification('lection name', 'The name of the lection', false)
    ]

    private _selection: SelectionManager = SelectionManager.getInstance()

    public async execute(activatedCommand: ActivatedCommand): Promise<void> {
        if (!activatedCommand.message.author)
            return
        
        const argName = activatedCommand.args[0]
        const snowflake = activatedCommand.message.author.id
        const selection = this._selection.get(snowflake)

        if (!argName && !selection.lection) {
            const response = noArgAndSelectedLectionResponse.buildResponse()
            activatedCommand.reply(response)
            return
        }

        const name = selection.lection ? selection.lection.name : argName
        const lection = await db.find.lectionByNameAndSnowflake(name, snowflake)

        if (!lection) {
            const response = lectionNotFoundResponse.buildResponse({ lectionName: name })
            activatedCommand.reply(response)
            return
        }

        const wordTitles = lection.words.map(word => word.title)
        const response = lectionInfoResponse.buildResponse({ lectionName: name, wordTitles: wordTitles })
        activatedCommand.reply(response)
    }

}