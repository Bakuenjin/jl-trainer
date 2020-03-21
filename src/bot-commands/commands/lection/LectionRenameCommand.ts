import Command from "../../Command";
import ArgumentSpecification from "../../../models/ArgumentSpecification";
import ActivatedCommand from "../../../models/ActivatedCommand";
import { db } from "../../..";
import { responseHandler } from "../../../utils/ResponseHandler";
import ResponseTemplate from "../../../utils/ResponseTemplate";
import ResponsePlaceholder from "../../../utils/ResponsePlaceholder";

export default class LectionRenameCommand extends Command {

    public readonly name: string = 'lection-rename'
    public readonly description: string = 'The command displays a list of lections assoziated with the user.'
    public readonly arguments: ArgumentSpecification[] = [
        new ArgumentSpecification('current name', 'The current name of the lection', true),
        new ArgumentSpecification('new name', 'The new name of the lection', true)
    ]

    public async execute(activatedCommand: ActivatedCommand): Promise<void> {
        if (!activatedCommand.message.author)
            return
        
        const currentName = activatedCommand.args[0]
        const newName = activatedCommand.args[1]
        const snowflake = activatedCommand.message.author.id

        const lection = await db.find.lectionByNameAndSnowflake(currentName, snowflake)

        if (!lection) {
            const response = responseHandler.createLectionNotFoundResponse(currentName)
            activatedCommand.reply(response)
            return
        }

        const newLection = await db.find.lectionByNameAndSnowflake(newName, snowflake)

        if (newLection) {
            const response = responseHandler.createLectionAlreadyExistsResponse(newName)
            activatedCommand.reply(response)
            return
        }

        await db.update.lectionNameByNameAndSnowflake(snowflake, currentName, newName)

        const response = responseHandler.createLectionRenameSuccessResponse(currentName, newName)
        activatedCommand.reply(response)
    }

}