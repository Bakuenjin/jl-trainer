import Command from "../../Command"
import ArgumentSpecification from "../../../models/ArgumentSpecification"
import ActivatedCommand from "../../../models/ActivatedCommand"
import { db } from "../../.."

export default class SelectWordCommand extends Command {

    public readonly name: string[] = ['select-word', 'sw']
    public readonly description: string = 'This command selects the specified word, if it fits with the currently selected lection.'
    public readonly arguments: ArgumentSpecification[] = [
        new ArgumentSpecification('word title', 'The title of the word that should be selected.', true)
    ]

    public async execute(activatedCommand: ActivatedCommand): Promise<void> {
        
    }  

}