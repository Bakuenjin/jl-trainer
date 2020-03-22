import Command from "../../Command"
import ArgumentSpecification from "../../../models/ArgumentSpecification"
import ActivatedCommand from "../../../models/ActivatedCommand"
import SelectionManager from "../../../models/SelectionManager"
import { db } from "../../.."
import { responseHandler } from "../../../models/response-handler/ResponseHandler"

export default class SelectLectionCommand extends Command {

    public readonly name: string = 'select-lection'
    public readonly description: string = 'This command selects the lection specified by name.'
    public readonly arguments: ArgumentSpecification[] = [
        new ArgumentSpecification('lection name', 'The lection that should be selected.', true)
    ]

    private _selectionManager: SelectionManager = SelectionManager.getInstance()

    public async execute(activatedCommand: ActivatedCommand): Promise<void> {
        if (!activatedCommand.message.author)
            return
        
        const name = activatedCommand.args[0]
        const snowflake = activatedCommand.message.author.id

        const lection = await db.find.lectionByNameAndSnowflake(name, snowflake)

        if (!lection) {
            const response = responseHandler.createLectionNotFoundResponse(name)
            activatedCommand.reply(response)
            return
        }

        this._selectionManager.clear(snowflake)
        this._selectionManager.select(snowflake, 'lection', lection)

        const response = responseHandler.generateResponse('lectionSelected', ['$LECTION_NAME'], [name])
        activatedCommand.reply(response)
    }  

}