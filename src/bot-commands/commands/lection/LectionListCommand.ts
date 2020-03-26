import Command from "../../Command";
import ArgumentSpecification from "../../../models/ArgumentSpecification";
import ActivatedCommand from "../../../models/ActivatedCommand";
import { db } from "../../..";
import { lectionListResponse, emptyLectionListResponse } from "../../../models/response-handling/ResponseList";

export default class LectionListCommand extends Command {

    public readonly name: string[] = ['lection-list', 'll']
    public readonly description: string = 'The command displays a list of lections assoziated with the user.'
    public readonly arguments: ArgumentSpecification[] = []

    public async execute(activatedCommand: ActivatedCommand): Promise<void> {
        if (!activatedCommand.message.author)
            return
        
        const snowflake = activatedCommand.message.author.id
        const names = await db.find.lectionNamesBySnowflake(snowflake)

        const response = names.length ? 
            lectionListResponse.buildResponse({ lectionNames: names }) :
            emptyLectionListResponse.buildResponse()
            
        activatedCommand.reply(response)
    }

}