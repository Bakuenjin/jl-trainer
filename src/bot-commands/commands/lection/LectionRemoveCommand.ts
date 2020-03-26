import Command from "../../Command";
import ArgumentSpecification from "../../../models/ArgumentSpecification";
import ActivatedCommand from "../../../models/ActivatedCommand";
import { db } from "../../..";
import SelectionManager from "../../../models/SelectionManager";
import { lectionNotFoundResponse, lectionRemoveSuccessResponse } from "../../../models/response-handling/ResponseList";

export default class LectionRemoveCommand extends Command {

    public readonly name: string[] = ['lection-remove']
    public readonly description: string = 'The command removes the lection with the specified name.'
    public readonly arguments: ArgumentSpecification[] = [
        new ArgumentSpecification('name', 'The name of the lection', true)
    ]

    private _selectionManager: SelectionManager = SelectionManager.getInstance()

    public async execute(activatedCommand: ActivatedCommand): Promise<void> {
        if (!activatedCommand.message.author)
            return
        
        const name = activatedCommand.args[0]
        const snowflake = activatedCommand.message.author.id

        const lection = await db.find.lectionByNameAndSnowflake(name, snowflake)

        if (!lection) {
            const response = lectionNotFoundResponse.buildResponse({ lectionName: name })
            activatedCommand.reply(response)
            return
        }

        await db.delete.lectionByNameAndSnowflake(name, snowflake)
        const { lection: selectedLection } = this._selectionManager.get(snowflake)

        if (selectedLection && selectedLection.name === name)
            this._selectionManager.clear(snowflake)

        const response = lectionRemoveSuccessResponse.buildResponse({ lectionName: name })
        activatedCommand.reply(response)
    }

}