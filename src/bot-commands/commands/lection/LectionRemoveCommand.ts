import Command from "../../Command";
import ArgumentSpecification from "../../../models/ArgumentSpecification";
import ActivatedCommand from "../../../models/ActivatedCommand";
import { db, client } from "../../..";
import { responseHandler } from "../../../models/response-handler/ResponseHandler";
import ReactionObserver from "../../../models/ReactionObserver";

export default class LectionRemoveCommand extends Command {

    public readonly name: string = 'lection-remove'
    public readonly description: string = 'The command removes the lection with the specified name.'
    public readonly arguments: ArgumentSpecification[] = [
        new ArgumentSpecification('name', 'The name of the lection', true)
    ]

    private _positiveReaction = '✔️'
    private _negativeReaction = '❌'


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

        const response = responseHandler.createLectionRemoveQuestionResponse(name)
        const responseMessage = await activatedCommand.reply(response)

        if (!responseMessage)
            return
        
        const reactionObserver = new ReactionObserver(client, responseMessage, [ this._positiveReaction, this._negativeReaction ])

        reactionObserver.on('reactionAdd', async (reaction, user) => {
            console.log(reaction)
            if (user.id !== snowflake) return

            if (reaction === this._positiveReaction || reaction === this._negativeReaction) {
                reactionObserver.stop()
                await reactionObserver.reset()
            }

            if (reaction === this._positiveReaction) {
                await db.delete.lectionByNameAndSnowflake(name, snowflake)
                const finalResponse = responseHandler.createLectionRemoveSuccessResponse(name)
                responseMessage.edit(finalResponse)
            }
            else if (reaction === this._negativeReaction) {
                const finalResponse = responseHandler.createLectionRemoveDeniedResponse(name)
                responseMessage.edit(finalResponse)
            }
        })

        console.log('reaction add callback initialized')

        reactionObserver.on('observingStopped', () => {
            console.log('observing stopped')
            reactionObserver.reset()
        })

        await reactionObserver.initialize()
        reactionObserver.observe({ duration: 10 })
    }

}