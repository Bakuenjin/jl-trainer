import ActivatedCommand from "../models/ActivatedCommand"
import ArgumentSpecification from "../models/ArgumentSpecification"

export default abstract class Command {

    public abstract readonly name: string[]
    public abstract readonly description: string
    public abstract readonly arguments: ArgumentSpecification[]
    public abstract async execute(activatedCommand: ActivatedCommand): Promise<void>

}