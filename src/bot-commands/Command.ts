import ActivatedCommand from "../models/ActivatedCommand"
import ArgumentSpecification from "../models/ArgumentSpecification"
import Describable from "../models/Describable"

export default abstract class Command extends Describable {

    public abstract readonly arguments: ArgumentSpecification[]
    public abstract async execute(activatedCommand: ActivatedCommand): Promise<void>

}