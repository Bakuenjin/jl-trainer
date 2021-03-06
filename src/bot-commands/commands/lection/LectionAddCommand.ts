import Command from "../../Command";
import ArgumentSpecification from "../../../models/ArgumentSpecification";
import ActivatedCommand from "../../../models/ActivatedCommand";
import { db } from "../../..";
import Lection from "../../../models/Lection";
import { responseHandler } from "../../../utils/ResponseHandler";
import ResponseTemplate from "../../../utils/ResponseTemplate";
import ResponsePlaceholder from "../../../utils/ResponsePlaceholder";

export default class LectionAddCommand extends Command {
    
    public readonly name: string = 'lection-add'
    public readonly description: string = 'The command adds a new lection to the users list of lections. Important: If the specified name is already in use, the creation is cancelled.'
    public readonly arguments: ArgumentSpecification[] = [
        new ArgumentSpecification('name', 'The name of the lection', true)
    ]
    
    public async execute(activatedCommand: ActivatedCommand): Promise<void> {
        if (!activatedCommand.message.author)
            return

        const name = activatedCommand.args[0]
        const snowflake = activatedCommand.message.author.id

        const existingLection = await db.find.lectionByNameAndSnowflake(name, snowflake)

        if (existingLection) {
            const response = responseHandler.createLectionAlreadyExistsResponse(name)
            activatedCommand.reply(response)
            return
        }

        const newLection = new Lection(snowflake, name, [])
        await db.insert.lection(newLection)

        const response = responseHandler.createLectionCreatedResponse(name)
        activatedCommand.reply(response)
    }

}