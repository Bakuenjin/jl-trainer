import Command from "../Command";
import ArgumentSpecification from "../../models/ArgumentSpecification";
import ActivatedCommand from "../../models/ActivatedCommand";
import { db } from "../..";
import Lection from "../../models/Lection";

export default class LectionAddCommand extends Command {
    
    public readonly name: string = 'lection-add'
    public readonly description: string = 'The command adds a new lection to the users list of lections. Important: If the specified name is already in use, the creation is cancelled.'
    public readonly arguments = [
        new ArgumentSpecification('name', 'The name of the lection', true)
    ]
    
    public async execute(activatedCommand: ActivatedCommand): Promise<void> {
        if (!activatedCommand.message.author)
            return

        const name = activatedCommand.args[0]
        const snowflake = activatedCommand.message.author.id

        const existingLection = await db.find.lectionByNameAndSnowflake(name, snowflake)

        if (existingLection) {
            activatedCommand.reply(`A lection with the specified name "${existingLection.name}" already exists. Use the command \`lection-list\` to view a list of your lections.`)
            return
        }

        const newLection = new Lection(snowflake, name, [])
        await db.insert.lection(newLection)
        activatedCommand.reply(`Lection "${newLection.name}" created.`)
    }

}